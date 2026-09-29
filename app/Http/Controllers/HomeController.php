<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Get all active categories ordered by order field
        $categories = Category::active()
            ->ordered()
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->slug,
                    'name' => $category->name,
                    'icon' => $category->icon,
                    'description' => $category->description,
                    'color' => $category->color,
                    'bgLight' => $category->bg_light,
                ];
            });

        // Get all active groups with their category
        $groups = Group::with('category')
            ->active()
            ->orderBy('clicks', 'desc') // Default sort by popularity
            ->get()
            ->map(function ($group) {
                return [
                    'id' => $group->slug,
                    'name' => $group->name,
                    'platform' => $group->platform,
                    'link' => $group->link,
                    'categoryId' => $group->category->slug,
                    'categoryName' => $group->category->name, // Tambahkan nama kategori
                    'imageUrl' => $group->image_url,
                    'description' => $group->description,
                    'membersCount' => $group->members_count,
                    'isVerified' => $group->is_verified,
                    'tags' => $group->tags ?? [],
                    'rules' => $group->rules ?? [],
                    'activity' => $group->activity,
                    'language' => $group->language,
                    'addedAt' => $group->added_at->format('Y-m-d'),
                    'clicks' => $group->clicks,
                    'isCustom' => $group->is_custom,
                    'reportedBroken' => $group->reported_broken,
                    'contactAdmin' => $group->contact_admin,
                ];
            });

        return Inertia::render('home', [
            'categories' => $categories,
            'groups' => $groups,
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'platform' => 'required|in:whatsapp,telegram',
            'link' => 'required|url|max:500',
            'categoryId' => 'required|string|exists:categories,slug',
            'imageUrl' => 'nullable|url|max:500',
            'description' => 'required|string|min:15|max:1000',
            'membersCount' => 'required|integer|min:1|max:500000',
            'tags' => 'required|array|min:1',
            'tags.*' => 'string|max:50',
            'rules' => 'nullable|array',
            'rules.*' => 'string|max:255',
            'activity' => 'required|in:Sangat Aktif,Aktif,Santai',
            'language' => 'required|string|max:100',
            'contactAdmin' => 'nullable|string|max:100',
        ]);

        // Cari category berdasarkan slug
        $category = Category::where('slug', $validated['categoryId'])->firstOrFail();

        // Generate unique slug untuk group
        $baseSlug = 'grp-custom-' . Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        
        while (Group::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        // Buat group baru
        $group = Group::create([
            'slug' => $slug,
            'name' => $validated['name'],
            'platform' => $validated['platform'],
            'link' => $validated['link'],
            'category_id' => $category->id,
            'image_url' => $validated['imageUrl'] ?? null,
            'description' => $validated['description'],
            'members_count' => $validated['membersCount'],
            'is_verified' => false, // User-submitted groups are not verified by default
            'tags' => $validated['tags'],
            'rules' => $validated['rules'] ?? ['Saling menghargai sesama anggota', 'Dilarang spam atau konten negatif'],
            'activity' => $validated['activity'],
            'language' => $validated['language'],
            'added_at' => now()->toDateString(),
            'clicks' => 0,
            'is_custom' => true,
            'reported_broken' => false,
            'contact_admin' => $validated['contactAdmin'] ?? null,
            'is_active' => true,
        ]);

        // Return success response with new group data
        return back()->with([
            'success' => 'Grup berhasil ditambahkan!',
            'newGroup' => [
                'id' => $group->slug,
                'name' => $group->name,
                'platform' => $group->platform,
                'link' => $group->link,
                'categoryId' => $category->slug,
                'categoryName' => $category->name,
                'imageUrl' => $group->image_url,
                'description' => $group->description,
                'membersCount' => $group->members_count,
                'isVerified' => $group->is_verified,
                'tags' => $group->tags ?? [],
                'rules' => $group->rules ?? [],
                'activity' => $group->activity,
                'language' => $group->language,
                'addedAt' => $group->added_at->format('Y-m-d'),
                'clicks' => $group->clicks,
                'isCustom' => $group->is_custom,
                'reportedBroken' => $group->reported_broken,
                'contactAdmin' => $group->contact_admin,
            ]
        ]);
    }
}
