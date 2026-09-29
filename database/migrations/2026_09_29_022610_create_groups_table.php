<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // ID dari TypeScript (grp-tech-01, etc)
            $table->string('name'); // Nama grup
            $table->enum('platform', ['whatsapp', 'telegram']); // Platform komunikasi
            $table->text('link'); // Link undangan grup
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Relasi ke categories
            $table->string('image_url')->nullable(); // URL gambar thumbnail grup
            $table->text('description'); // Deskripsi lengkap grup
            $table->integer('members_count')->default(0); // Jumlah anggota
            $table->boolean('is_verified')->default(false); // Status verifikasi
            $table->json('tags')->nullable(); // Array tags untuk pencarian
            $table->json('rules')->nullable(); // Array aturan grup
            $table->enum('activity', ['Sangat Aktif', 'Aktif', 'Santai'])->default('Aktif'); // Level aktivitas
            $table->string('language')->default('Bahasa Indonesia'); // Bahasa yang digunakan
            $table->date('added_at'); // Tanggal ditambahkan
            $table->integer('clicks')->default(0); // Jumlah klik/view
            $table->boolean('is_custom')->default(false); // Apakah dibuat oleh user
            $table->boolean('reported_broken')->default(false); // Status laporan rusak
            $table->string('contact_admin')->nullable(); // Kontak admin grup
            $table->boolean('is_active')->default(true); // Status aktif
            $table->timestamps();
            
            // Indexes untuk performa query
            $table->index('category_id');
            $table->index('platform');
            $table->index('is_verified');
            $table->index('is_active');
            $table->index('added_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
