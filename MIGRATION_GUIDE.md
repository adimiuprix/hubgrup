# Migration Guide - Dynamic Data Implementation

## 📋 Ringkasan Perubahan

Aplikasi HubGrup telah diupdate dari menggunakan data hardcoded (TypeScript constants) menjadi data dinamis dari database MySQL/MariaDB.

## 🗄️ Database Schema

### 1. Tabel Categories
```sql
- id (primary key)
- slug (unique) - identifier kategori (tech, career, dll)
- name - nama kategori
- icon - nama icon dari lucide-react
- description - deskripsi kategori
- color - Tailwind color class
- bg_light - Tailwind background class
- order - urutan tampil
- is_active - status aktif/nonaktif
- timestamps
```

### 2. Tabel Groups
```sql
- id (primary key)
- slug (unique) - identifier grup
- name - nama grup
- platform - ENUM: whatsapp/telegram
- link - URL undangan
- category_id (foreign key) - relasi ke categories
- image_url - URL gambar thumbnail
- description - deskripsi lengkap
- members_count - jumlah anggota
- is_verified - status verifikasi
- tags - JSON array
- rules - JSON array
- activity - ENUM: Sangat Aktif/Aktif/Santai
- language - bahasa yang digunakan
- added_at - tanggal ditambahkan
- clicks - jumlah klik/view
- is_custom - dibuat oleh user
- reported_broken - status laporan rusak
- contact_admin - kontak admin
- is_active - status aktif
- timestamps
```

## 🚀 Cara Menjalankan

### Fresh Installation (Recommended)
```bash
# 1. Jalankan migration dan seeder
php artisan migrate:fresh --seed

# 2. Jalankan Vite dev server
npm run dev
```

### Existing Database
```bash
# 1. Jalankan migration saja
php artisan migrate

# 2. Seed data
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=GroupSeeder
```

## 📝 Perubahan Kode

### Backend (Laravel)

#### HomeController
```php
// Sekarang mengirim data dari database
public function index()
{
    $categories = Category::active()->ordered()->get();
    $groups = Group::with('category')->active()->get();
    
    return Inertia::render('home', [
        'categories' => $categories,
        'groups' => $groups,
    ]);
}
```

#### Models
- `Category` model dengan relasi `groups()`
- `Group` model dengan relasi `category()`
- Scopes: `active()`, `verified()`, `platform()`, `category()`, `search()`

### Frontend (React/TypeScript)

#### Pages
- `home.tsx` - Menerima props `categories` dan `groups` dari Inertia

#### Components yang Updated
1. `HeroSearch.tsx` - Menerima prop `categories`
2. `Footer.tsx` - Menerima prop `categories`
3. `AddGroupModal.tsx` - Menerima prop `categories`

#### Types
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgLight: string;
}

interface GroupItem {
  // ... existing fields
  categoryName?: string; // Added from database
}
```

## 🔄 Backward Compatibility

**REMOVED:** File `INITIAL_GROUPS.ts` dan `CATEGORIES.ts` di folder `resources/js/data/` sudah **dihapus** karena tidak lagi diperlukan.

Semua data sekarang 100% dinamis dari database.

## ✅ Testing Checklist

- [ ] Database migration berhasil
- [ ] Seeder berjalan tanpa error
- [ ] Home page menampilkan data dari database
- [ ] Filter kategori berfungsi
- [ ] Search berfungsi
- [ ] Add new group masih berfungsi (localStorage)
- [ ] Favorite groups masih berfungsi (localStorage)

## 🐛 Troubleshooting

### Migration Error
```bash
# Reset database
php artisan migrate:fresh --seed
```

### Data Tidak Muncul
```bash
# Cek apakah data ada
php artisan tinker
>>> Category::count()
>>> Group::count()

# Jika kosong, jalankan seeder
>>> exit
php artisan db:seed
```

### Error TypeScript
```bash
# Restart Vite dev server
npm run dev
```

## 📊 Data Summary

Setelah seeding:
- **10 Categories** (termasuk "Semua Kategori")
- **30 Groups** tersebar di berbagai kategori:
  - 4 Teknologi & Koding
  - 3 Karir & Loker
  - 3 Edukasi & Beasiswa
  - 3 Bisnis & Finansial
  - 3 Gaming & E-Sports
  - 2 Desain & Kreatif
  - 2 Hiburan & Pop Culture
  - 3 Komunitas Daerah
  - 3 Hobi & Gaya Hidup
  - Plus custom groups dari localStorage

## 🔮 Future Enhancements

- [ ] Admin panel untuk manage groups
- [ ] User authentication
- [ ] API untuk mobile apps
- [ ] Analytics dashboard
- [ ] Group verification system
- [ ] Report moderation system
