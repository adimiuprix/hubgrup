<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'all',
                'name' => 'Semua Kategori',
                'icon' => 'LayoutGrid',
                'description' => 'Jelajahi seluruh link komunitas dan grup',
                'color' => 'text-indigo-600',
                'bg_light' => 'bg-indigo-50 border-indigo-200',
                'order' => 0,
                'is_active' => true,
            ],
            [
                'slug' => 'tech',
                'name' => 'Teknologi & Koding',
                'icon' => 'Code2',
                'description' => 'Web dev, mobile, AI, data science & pemrograman',
                'color' => 'text-blue-600',
                'bg_light' => 'bg-blue-50 border-blue-200',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'career',
                'name' => 'Karir & Loker',
                'icon' => 'Briefcase',
                'description' => 'Info lowongan kerja, freelance, BUMN & tips interview',
                'color' => 'text-emerald-600',
                'bg_light' => 'bg-emerald-50 border-emerald-200',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'education',
                'name' => 'Edukasi & Beasiswa',
                'icon' => 'GraduationCap',
                'description' => 'LPDP, TOEFL/IELTS, UTBK, kuliah & kursus online',
                'color' => 'text-amber-600',
                'bg_light' => 'bg-amber-50 border-amber-200',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'business',
                'name' => 'Bisnis & Finansial',
                'icon' => 'TrendingUp',
                'description' => 'Saham, crypto, UMKM, e-commerce & peluang usaha',
                'color' => 'text-violet-600',
                'bg_light' => 'bg-violet-50 border-violet-200',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'gaming',
                'name' => 'Gaming & E-Sports',
                'icon' => 'Gamepad2',
                'description' => 'Mobile Legends, Valorant, Genshin, Steam & console',
                'color' => 'text-rose-600',
                'bg_light' => 'bg-rose-50 border-rose-200',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'design',
                'name' => 'Desain & Kreatif',
                'icon' => 'Palette',
                'description' => 'UI/UX, ilustrasi, video editing, 3D & fotografi',
                'color' => 'text-pink-600',
                'bg_light' => 'bg-pink-50 border-pink-200',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'slug' => 'entertainment',
                'name' => 'Hiburan & Pop Culture',
                'icon' => 'Film',
                'description' => 'Film, serial, anime, musik, K-Pop & obrolan santai',
                'color' => 'text-orange-600',
                'bg_light' => 'bg-orange-50 border-orange-200',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'slug' => 'regional',
                'name' => 'Komunitas Daerah',
                'icon' => 'MapPin',
                'description' => 'Komunitas kota Jabodetabek, Surabaya, Bandung, dll',
                'color' => 'text-teal-600',
                'bg_light' => 'bg-teal-50 border-teal-200',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'slug' => 'lifestyle',
                'name' => 'Hobi & Gaya Hidup',
                'icon' => 'HeartHandshake',
                'description' => 'Kebugaran, traveling, otomotif, buku & kuliner',
                'color' => 'text-cyan-600',
                'bg_light' => 'bg-cyan-50 border-cyan-200',
                'order' => 9,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert(array_merge($category, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
