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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // ID dari TypeScript (tech, career, etc)
            $table->string('name'); // Nama kategori
            $table->string('icon')->nullable(); // Nama icon dari lucide-react
            $table->text('description')->nullable(); // Deskripsi kategori
            $table->string('color')->nullable(); // Tailwind color class
            $table->string('bg_light')->nullable(); // Tailwind background class
            $table->integer('order')->default(0); // Urutan tampil
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
