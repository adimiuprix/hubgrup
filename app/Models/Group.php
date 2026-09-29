<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Group extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'platform',
        'link',
        'category_id',
        'image_url',
        'description',
        'members_count',
        'is_verified',
        'tags',
        'rules',
        'activity',
        'language',
        'added_at',
        'clicks',
        'is_custom',
        'reported_broken',
        'contact_admin',
        'is_active',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'is_custom' => 'boolean',
        'reported_broken' => 'boolean',
        'is_active' => 'boolean',
        'members_count' => 'integer',
        'clicks' => 'integer',
        'tags' => 'array',
        'rules' => 'array',
        'added_at' => 'date',
    ];

    /**
     * Get the category that owns the group.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Scope a query to only include active groups.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include verified groups.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Scope a query to filter by platform.
     */
    public function scopePlatform($query, $platform)
    {
        if ($platform !== 'all') {
            return $query->where('platform', $platform);
        }
        return $query;
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $categorySlug)
    {
        if ($categorySlug !== 'all') {
            return $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }
        return $query;
    }

    /**
     * Scope a query to search groups.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhereJsonContains('tags', $search);
        });
    }

    /**
     * Increment the clicks counter.
     */
    public function incrementClicks()
    {
        $this->increment('clicks');
    }
}
