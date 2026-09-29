<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Category;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            // TEKNOLOGI
            [
                'slug' => 'grp-tech-01',
                'name' => 'Frontend Developer Indonesia',
                'platform' => 'telegram',
                'link' => 'https://t.me/frontend_dev_id',
                'category_slug' => 'tech',
                'image_url' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Komunitas diskusi seputar React, Next.js, Vue, Tailwind CSS, TypeScript, serta berbagi tips arsitektur modern web.',
                'members_count' => 14250,
                'is_verified' => true,
                'tags' => ['react', 'nextjs', 'typescript', 'tailwind', 'frontend'],
                'rules' => [
                    'Gunakan bahasa yang sopan dan santun',
                    'Dilarang spam iklan atau jasa skripsi',
                    'Kirim pertanyaan koding lengkap dengan cuplikan kode atau repo',
                    'Hormati perbedaan pendapat'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-15',
                'clicks' => 3420,
                'contact_admin' => '@admin_frontend_id'
            ],
            [
                'slug' => 'grp-tech-02',
                'name' => 'Pythonista Nusantara ID',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/PythonistaIndoHQ',
                'category_slug' => 'tech',
                'image_url' => 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Grup WhatsApp pegiat Python: Data Science, Machine Learning, Automation Scripting, Django, dan FastAPI.',
                'members_count' => 890,
                'is_verified' => true,
                'tags' => ['python', 'datascience', 'fastapi', 'automation', 'ai'],
                'rules' => [
                    'Diskusi fokus pada pemrograman Python',
                    'No pornografi, judi, atau sara',
                    'Tanya error sertakan traceback yang jelas'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-01',
                'clicks' => 1890,
                'contact_admin' => '+6281234567890'
            ],
            [
                'slug' => 'grp-tech-03',
                'name' => 'AI & Prompt Engineering Indonesia',
                'platform' => 'telegram',
                'link' => 'https://t.me/aiprompt_indonesia',
                'category_slug' => 'tech',
                'image_url' => 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Eksplorasi prompt engineering, LLM, Gemini, Claude, Cursor, ChatGPT, dan implementasi workflow AI untuk produktivitas.',
                'members_count' => 22800,
                'is_verified' => true,
                'tags' => ['ai', 'gemini', 'chatgpt', 'prompt', 'automation'],
                'rules' => [
                    'Berbagi tips dan studi kasus nyata pemanfaatan AI',
                    'Dilarang menjual software crack atau akun curian',
                    'Diskusi etika dan batas keamanan pemakaian LLM'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-10',
                'clicks' => 4530,
                'contact_admin' => '@aimaster_indo'
            ],
            [
                'slug' => 'grp-tech-04',
                'name' => 'Cyber Security & Bug Hunter ID',
                'platform' => 'telegram',
                'link' => 'https://t.me/infosec_indonesia_channel',
                'category_slug' => 'tech',
                'image_url' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Wadah sharing edukasi keamanan siber, ethical hacking, CTF, OWASP, dan penulisan laporan Bug Bounty.',
                'members_count' => 16400,
                'is_verified' => true,
                'tags' => ['security', 'ctf', 'bughunter', 'ethicalhacking', 'linux'],
                'rules' => [
                    'White-hat & educational purposes ONLY',
                    'Dilarang membahas carding, cracking ilegal, atau doxxing',
                    'Saling bimbing pemula di dunia infosec'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-20',
                'clicks' => 2980,
                'contact_admin' => '@infosec_guard'
            ],

            // KARIR & LOKER
            [
                'slug' => 'grp-career-01',
                'name' => 'Info Loker BUMN & CPNS Terupdate',
                'platform' => 'telegram',
                'link' => 'https://t.me/loker_bumn_cpns_resmi',
                'category_slug' => 'career',
                'image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Kanal informasi lowongan kerja resmi BUMN, kementerian, lembaga negara, dan BUMD di seluruh Indonesia.',
                'members_count' => 48900,
                'is_verified' => true,
                'tags' => ['loker', 'bumn', 'cpns', 'karir', 'freshgraduate'],
                'rules' => [
                    'Hanya membagikan link resmi perusahaan/portal rekrutmen',
                    'Waspada terhadap modus penipuan berkedok travel/tiket',
                    'Semua lowongan dipastikan gratis tanpa pungutan biaya'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-05',
                'clicks' => 8120,
                'contact_admin' => '@admin_loker_bumn'
            ],
            [
                'slug' => 'grp-career-02',
                'name' => 'Remote Work & Freelancer Indonesia',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/RemoteWorkNusantara',
                'category_slug' => 'career',
                'image_url' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Komunitas kerja remote dari rumah (WFH), tips mendapatkan klien luar negeri (Upwork, Fiverr, Toptal), dan manajemen invoice.',
                'members_count' => 1020,
                'is_verified' => true,
                'tags' => ['remotework', 'freelance', 'wfh', 'upwork', 'klien'],
                'rules' => [
                    'Saling dukung sesama pekerja remote',
                    'Dilarang menawarkan skema MLM atau cepat kaya tanpa kerja',
                    'Boleh sharing template proposal yang berhasil'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-14',
                'clicks' => 3100,
                'contact_admin' => '+6281987654321'
            ],
            [
                'slug' => 'grp-career-03',
                'name' => 'Tech & Startup Jobs Indo',
                'platform' => 'telegram',
                'link' => 'https://t.me/indotech_jobs',
                'category_slug' => 'career',
                'image_url' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Update harian lowongan kerja Software Engineer, Product Manager, QA, DevOps, dan Data Analyst di tech startup ternama.',
                'members_count' => 19500,
                'is_verified' => true,
                'tags' => ['startup', 'softwareengineer', 'techjobs', 'devops', 'product'],
                'rules' => [
                    'Cantumkan rentang gaji (salary range) jika memposting loker',
                    'Format loker harus jelas: posisi, persyaratan, dan cara melamar'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia & English',
                'added_at' => '2025-01-28',
                'clicks' => 4200,
                'contact_admin' => '@techrecruit_id'
            ],

            // EDUKASI & BEASISWA
            [
                'slug' => 'grp-edu-01',
                'name' => 'Pejuang Beasiswa LPDP & Luar Negeri',
                'platform' => 'telegram',
                'link' => 'https://t.me/pejuangbeasiswa_world',
                'category_slug' => 'education',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Forum persiapan esai, Letter of Acceptance (LoA), wawancara LPDP, Chevening, AAS, MEXT, DAAD, dan beasiswa bergengsi dunia.',
                'members_count' => 31200,
                'is_verified' => true,
                'tags' => ['beasiswa', 'lpdp', 'kuliahluarnegeri', 'chevening', 'aas'],
                'rules' => [
                    'Berbagi info beasiswa yang valid dan terpercaya',
                    'Review esai bersama secara konstruktif',
                    'Dilarang melakukan joki dokumen atau manipulasi berkas'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-12',
                'clicks' => 5340,
                'contact_admin' => '@beasiswa_center'
            ],
            [
                'slug' => 'grp-edu-02',
                'name' => 'IELTS & TOEFL Practice Club ID',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/EnglishIELTSTestHub',
                'category_slug' => 'education',
                'image_url' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Latihan speaking harian, bedah soal reading/listening, dan saling koreksi writing task 1 & 2 untuk persiapan skor 7.0+.',
                'members_count' => 950,
                'is_verified' => true,
                'tags' => ['ielts', 'toefl', 'belajarbahasainggris', 'speaking', 'edukasi'],
                'rules' => [
                    'Gunakan Bahasa Inggris pada jam-jam speaking club (19.00 - 21.00 WIB)',
                    'Koreksi rekan dengan kalimat yang membangun',
                    'Hindari obrolan di luar topik belajar bahasa'
                ],
                'activity' => 'Aktif',
                'language' => 'English & Indonesia',
                'added_at' => '2025-02-05',
                'clicks' => 2150,
                'contact_admin' => '+6281122334455'
            ],
            [
                'slug' => 'grp-edu-03',
                'name' => 'Pejuang UTBK SNBT & Masuk PTN',
                'platform' => 'telegram',
                'link' => 'https://t.me/pejuang_utbk_snbt_resmi',
                'category_slug' => 'education',
                'image_url' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Bank soal TPS, literasi Bahasa Indonesia & Inggris, penalaran matematika, serta try out mingguan persiapan masuk PTN favorit.',
                'members_count' => 42100,
                'is_verified' => true,
                'tags' => ['utbk', 'snbt', 'ptn', 'sma', 'tryout'],
                'rules' => [
                    'Fokus pembahasan soal dan tips belajar efektif',
                    'No spam link promosi bimbel berbayar tanpa izin admin',
                    'Semangat berjuang tanpa patah arang!'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-10',
                'clicks' => 6780,
                'contact_admin' => '@utbk_mentor'
            ],

            // BISNIS & FINANSIAL
            [
                'slug' => 'grp-biz-01',
                'name' => 'Komunitas Saham & Investasi IDX',
                'platform' => 'telegram',
                'link' => 'https://t.me/sahamid_investor_forum',
                'category_slug' => 'business',
                'image_url' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Analisis fundamental dan teknikal saham IHSG, bedah laporan keuangan emiten, dan tips manajemen portofolio jangka panjang.',
                'members_count' => 27500,
                'is_verified' => true,
                'tags' => ['saham', 'ihsg', 'investasi', 'keuangan', 'dividen'],
                'rules' => [
                    'Disclaimer On: Semua analisa bukan ajakan membeli atau menjual',
                    'Dilarang melakukan pump & dump atau pom-pom saham gorengan',
                    'Diskusikan data riil dari laporan IDX'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-18',
                'clicks' => 4980,
                'contact_admin' => '@idx_analyst'
            ],
            [
                'slug' => 'grp-biz-02',
                'name' => 'UMKM Go Digital & E-Commerce Seller',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/UMKMDigitalNusantara',
                'category_slug' => 'business',
                'image_url' => 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Trik optimasi toko Shopee, TikTok Shop, Tokopedia, tips copywriting jualan online, dan negosiasi supplier tangan pertama.',
                'members_count' => 1010,
                'is_verified' => true,
                'tags' => ['umkm', 'shopee', 'tiktokshop', 'bisnisonline', 'jualan'],
                'rules' => [
                    'Boleh sharing produk pada hari khusus (Jumat Berkah)',
                    'Fokus diskusi strategi penjualan dan logistik',
                    'Hati-hati terhadap pihak yang mengaku perwakilan marketplace'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-12',
                'clicks' => 2750,
                'contact_admin' => '+6285712345678'
            ],
            [
                'slug' => 'grp-biz-03',
                'name' => 'Crypto & Web3 Indonesia Alpha',
                'platform' => 'telegram',
                'link' => 'https://t.me/crypto_indo_alpha_web3',
                'category_slug' => 'business',
                'image_url' => 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Diskusi Bitcoin, Ethereum, Solana ecosystem, perkembangan DeFi, airdrop verified, serta riset on-chain analytics.',
                'members_count' => 36800,
                'is_verified' => false,
                'tags' => ['crypto', 'bitcoin', 'web3', 'airdrop', 'blockchain'],
                'rules' => [
                    'DYOR (Do Your Own Research)',
                    'Haram membagikan link phising atau wallet drainer',
                    'No financial advice'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-22',
                'clicks' => 5890,
                'contact_admin' => '@crypto_mod'
            ],

            // GAMING & ESPORTS
            [
                'slug' => 'grp-gaming-01',
                'name' => 'Mobile Legends Bang Bang (MLBB) Indo',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/MLBBIndonesiaMabarSquad',
                'category_slug' => 'gaming',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Cari teman mabar ranked Mythic / Immortal, build item hero terupdate, turnamen mingguan, dan tips rotasi makro mikro.',
                'members_count' => 980,
                'is_verified' => true,
                'tags' => ['mlbb', 'mabar', 'mobilelegends', 'mythic', 'esports'],
                'rules' => [
                    'No toxic, no bacot berlebihan saat mabar kalah',
                    'Dilarang menggunakan cheat / script radar map',
                    'Ajak mabar dengan format: Role, Rank saat ini, dan waktu main'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-14',
                'clicks' => 7210,
                'contact_admin' => '+6287711223344'
            ],
            [
                'slug' => 'grp-gaming-02',
                'name' => 'Valorant Indonesia Community',
                'platform' => 'telegram',
                'link' => 'https://t.me/valorant_id_community',
                'category_slug' => 'gaming',
                'image_url' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Komunitas pemain Valorant PC Indonesia: cari duo/trio/5-stack, sharing lineup Sova/Viper, dan informasi turnamen VCT.',
                'members_count' => 18700,
                'is_verified' => true,
                'tags' => ['valorant', 'fps', 'pcgaming', 'riotgames', 'mabar'],
                'rules' => [
                    'Wajib sportif dan komunikatif saat satu party',
                    'Dilarang melakukan joki akun atau jual beli akun ilegal',
                    'Gunakan voice channel Discord untuk kelancaran mabar'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-25',
                'clicks' => 3450,
                'contact_admin' => '@val_admin_id'
            ],
            [
                'slug' => 'grp-gaming-03',
                'name' => 'Genshin Impact & HoYoverse Nusantara',
                'platform' => 'telegram',
                'link' => 'https://t.me/genshin_hoyoverse_indo',
                'category_slug' => 'gaming',
                'image_url' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Bocoran banner terbaru, panduan build artefak, lore teyvat, pamer gacha beradab, dan mabar farming boss domain.',
                'members_count' => 25400,
                'is_verified' => true,
                'tags' => ['genshinimpact', 'hoyoverse', 'honkaistarrail', 'anime', 'gacha'],
                'rules' => [
                    'Tandai spoiler quest utama dengan tag spoiler',
                    'Gacha flex hanya diperbolehkan di thread khusus',
                    'Saling bantu pemain baru menaikkan World Level'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-02',
                'clicks' => 4120,
                'contact_admin' => '@teyvat_traveler'
            ],

            // DESAIN & KREATIF
            [
                'slug' => 'grp-design-01',
                'name' => 'UI/UX Designer & Product Thinkers ID',
                'platform' => 'telegram',
                'link' => 'https://t.me/uiux_design_indonesia',
                'category_slug' => 'design',
                'image_url' => 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Wadah desainer antarmuka digital: sharing file Figma, review portofolio, design system token, dan usability testing.',
                'members_count' => 15300,
                'is_verified' => true,
                'tags' => ['uiux', 'figma', 'designsystem', 'userexperience', 'portofolio'],
                'rules' => [
                    'Kritik portofolio harus konstruktif disertai solusi',
                    'Berikan atribusi kepada pembuat aset grafis',
                    'Dilarang plagiasi karya desainer lain'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-16',
                'clicks' => 3820,
                'contact_admin' => '@figma_lead_id'
            ],
            [
                'slug' => 'grp-design-02',
                'name' => 'Video Editor & Content Creator Indo',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/VideoEditorCreatorID',
                'category_slug' => 'design',
                'image_url' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Trik Premiere Pro, After Effects, CapCut, DaVinci Resolve, color grading, sound design, dan tips algoritma konten video pendek.',
                'members_count' => 970,
                'is_verified' => true,
                'tags' => ['videoeditor', 'capcut', 'premierepro', 'creator', 'youtube'],
                'rules' => [
                    'Diskusi seputar editing dan teknik produksi',
                    'Dilarang barter view/sub/like yang merusak analitik'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-08',
                'clicks' => 2430,
                'contact_admin' => '+6282133445566'
            ],

            // HIBURAN & POP CULTURE
            [
                'slug' => 'grp-ent-01',
                'name' => 'Anime & Manga Lovers Indonesia (AMLI)',
                'platform' => 'telegram',
                'link' => 'https://t.me/anime_manga_lovers_id',
                'category_slug' => 'entertainment',
                'image_url' => 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Diskusi episode anime ongoing, rekomendasi manga/manhwa/webtoon terbaik, cosplay event, dan trivia budaya pop Jepang.',
                'members_count' => 38500,
                'is_verified' => true,
                'tags' => ['anime', 'manga', 'manhwa', 'otaku', 'wibu'],
                'rules' => [
                    'Dilarang keras menyebarkan spoiler tanpa peringatan jelas',
                    'No konten NSFW / 18+',
                    'Hargai selera genre anime masing-masing member'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-08',
                'clicks' => 6540,
                'contact_admin' => '@amli_mod'
            ],
            [
                'slug' => 'grp-ent-02',
                'name' => 'Movie & Series Discussion Nusantara',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/BioskopSeriesDiscussion',
                'category_slug' => 'entertainment',
                'image_url' => 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Review film bioskop terkini, series Netflix, HBO, Disney+, rekomendasi film plot twist, dan analisis sinematografi.',
                'members_count' => 840,
                'is_verified' => false,
                'tags' => ['film', 'bioskop', 'netflix', 'series', 'review'],
                'rules' => [
                    'Sertakan peringatan spoiler bagi film yang baru rilis di bawah 2 minggu',
                    'Dilarang share link download bajakan di grup'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-11',
                'clicks' => 1670,
                'contact_admin' => '+6283899887766'
            ],

            // REGIONAL & DAERAH
            [
                'slug' => 'grp-reg-01',
                'name' => 'Komunitas Warga Jabodetabek Info',
                'platform' => 'telegram',
                'link' => 'https://t.me/info_jabodetabek_terkini',
                'category_slug' => 'regional',
                'image_url' => 'https://images.unsplash.com/photo-1555899434-94d1338eb7f5?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Update real-time lalu lintas, jadwal KRL, MRT, Transjakarta, kuliner hidden gem, dan info cuaca seputar Jakarta, Bogor, Depok, Tangerang, Bekasi.',
                'members_count' => 45000,
                'is_verified' => true,
                'tags' => ['jakarta', 'jabodetabek', 'krl', 'mrt', 'infoterkini'],
                'rules' => [
                    'Pastikan kabar lalu lintas dan bencana berasal dari sumber sahih',
                    'Hindari menyebarkan berita hoax atau isu SARA'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-02',
                'clicks' => 7430,
                'contact_admin' => '@jakarta_bot'
            ],
            [
                'slug' => 'grp-reg-02',
                'name' => 'Arek Suroboyo & Jawa Timur Community',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/ArekSuroboyoConnect',
                'category_slug' => 'regional',
                'image_url' => 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Tongkrongan online warga Surabaya, Sidoarjo, Gresik, Malang: info agenda kota, kuliner malam, dan silaturahmi.',
                'members_count' => 920,
                'is_verified' => true,
                'tags' => ['surabaya', 'jawatimur', 'areksuroboyo', 'kuliner', 'daerah'],
                'rules' => [
                    'Guyub rukun seduluran saklawase',
                    'Gunakan bahasa Suroboyoan yang akrab dan santun',
                    'Dilarang provokasi antar suporter sepakbola'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Jawa & Indonesia',
                'added_at' => '2025-02-03',
                'clicks' => 2110,
                'contact_admin' => '+6285677889900'
            ],
            [
                'slug' => 'grp-reg-03',
                'name' => 'Bandung Juara & Info Priangan',
                'platform' => 'telegram',
                'link' => 'https://t.me/bandung_juara_official',
                'category_slug' => 'regional',
                'image_url' => 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Wargi Bandung: info spot ngopi aesthetic, konser musik, lari pagi di Gasibu, dan agenda kreatif kota kembang.',
                'members_count' => 21600,
                'is_verified' => true,
                'tags' => ['bandung', 'jawabarat', 'kulinerbandung', 'wisata', 'priangan'],
                'rules' => [
                    'Bagikan rekomendasi tempat yang ramah kantong dan ramah lingkungan',
                    'No hoax dan no spam'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Sunda & Indonesia',
                'added_at' => '2025-01-30',
                'clicks' => 3120,
                'contact_admin' => '@bdg_wargi'
            ],

            // HOBI & GAYA HIDUP
            [
                'slug' => 'grp-life-01',
                'name' => 'Pelari Santai & Running Club Indo',
                'platform' => 'whatsapp',
                'link' => 'https://chat.whatsapp.com/invite/IndoRunnersSundayClub',
                'category_slug' => 'lifestyle',
                'image_url' => 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Jadwal lari bareng Minggu pagi di Car Free Day, review sepatu lari, tips mencegah cedera hamstring/shin splint, dan info race marathon.',
                'members_count' => 990,
                'is_verified' => true,
                'tags' => ['running', 'marathon', 'cfd', 'olahraga', 'kesehatan'],
                'rules' => [
                    'Pace berapapun disambut hangat, no gatekeeping!',
                    'Saling menyemangati untuk hidup sehat',
                    'Posting foto lari di Strava dipersilakan'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-02-09',
                'clicks' => 2890,
                'contact_admin' => '+6281312344321'
            ],
            [
                'slug' => 'grp-life-02',
                'name' => 'Klub Pecinta Buku & Literasi Indonesia',
                'platform' => 'telegram',
                'link' => 'https://t.me/klub_buku_nusantara',
                'category_slug' => 'lifestyle',
                'image_url' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Bedah buku bulanan (fiksi, non-fiksi, self-improvement, filsafat), tukar pinjam buku, dan info diskon pameran buku nasional.',
                'members_count' => 17200,
                'is_verified' => true,
                'tags' => ['buku', 'literasi', 'reading', 'novel', 'selfimprovement'],
                'rules' => [
                    'Hanya diskusikan buku fisik orisinal atau e-book legal',
                    'Tolak keras pembajakan buku'
                ],
                'activity' => 'Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-19',
                'clicks' => 1980,
                'contact_admin' => '@pustaka_indo'
            ],
            [
                'slug' => 'grp-life-03',
                'name' => 'Backpacker & Solo Traveler Nusantara',
                'platform' => 'telegram',
                'link' => 'https://t.me/backpacker_indonesia_hub',
                'category_slug' => 'lifestyle',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=360&h=360&q=80',
                'description' => 'Tips keliling Indonesia dengan budget hemat, info promo tiket pesawat & kereta api, open trip terpercaya, dan sharing penginapan murah.',
                'members_count' => 33400,
                'is_verified' => true,
                'tags' => ['travel', 'backpacker', 'wisata', 'solotravel', 'pantai'],
                'rules' => [
                    'Bagikan rincian biaya aktual untuk transparansi',
                    'Jaga kebersihan alam: Leave nothing but footprints'
                ],
                'activity' => 'Sangat Aktif',
                'language' => 'Bahasa Indonesia',
                'added_at' => '2025-01-09',
                'clicks' => 4870,
                'contact_admin' => '@traveler_guide'
            ],
        ];

        foreach ($groups as $groupData) {
            $categorySlug = $groupData['category_slug'];
            unset($groupData['category_slug']);
            
            $category = Category::where('slug', $categorySlug)->first();
            
            if ($category) {
                Group::create(array_merge($groupData, [
                    'category_id' => $category->id,
                ]));
            }
        }
    }
}
