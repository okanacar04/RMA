# 🎓 EduCRM - Kurulum Rehberi

## Seçenek 1: Bulut (Her Yerden Erişim) — Önerilen

### Render.com ile Ücretsiz Yayınlama

1. **GitHub hesabı açın** (yoksa): https://github.com/signup
2. **Yeni repo oluşturun**: https://github.com/new
   - Repo adı: `educrm`
   - Private seçin (verileriniz gizli kalsın)
   - "Create repository" tıklayın
3. **Bu dosyaları GitHub'a yükleyin**:
   - Repo sayfasında "uploading an existing file" linkine tıklayın
   - Tüm dosyaları sürükleyin (`server.js`, `package.json`, `render.yaml`, `public/` klasörü, `data/` klasörü)
   - "Commit changes" tıklayın
4. **Render.com'a gidin**: https://render.com
   - GitHub hesabınızla giriş yapın
   - "New +" → "Web Service" tıklayın
   - GitHub reponuzu seçin (`educrm`)
   - Ayarlar otomatik gelecek (render.yaml sayesinde)
   - "Create Web Service" tıklayın
5. **2-3 dakika bekleyin**, Render uygulamayı kuracak
6. **Adresiniz hazır!** Render size bir URL verecek:
   ```
   https://educrm-xxxx.onrender.com
   ```
   Bu adresi telefondan, bilgisayardan, her yerden açabilirsiniz!

### Önemli Notlar (Render Free Tier)
- Ücretsiz plan 15 dk inaktif kalınca uyku moduna geçer, ilk açılışta ~30 sn beklersiniz
- Veriler servis çalışırken kalıcıdır
- Ayarlar → Veri → "Yedekle" butonuyla düzenli yedek alın
- Güncelleme yapmak için GitHub'daki dosyaları güncelleyin, Render otomatik deploy eder

---

## Seçenek 2: Yerel (Aynı Ağ)

### Gereksinimler
- Node.js v16+ — https://nodejs.org

### Kurulum
```bash
cd educrm-cloud
npm install
npm start
```

Ekranda:
```
🎓 EduCRM Başlatıldı!
Bilgisayar:  http://localhost:3000
Ağ:          http://192.168.1.XX:3000
```

---

## İlk Kullanım

1. İlk açılışta Admin hesabı oluşturun
2. Ayarlar → Kullanıcılar'dan Admission/FAO hesapları ekleyin
3. Ayarlar → Okullar'dan okulları düzenleyin
4. Ayarlar → Programlar'dan programları ayarlayın
5. Ayarlar → Batch Tarihleri'nden "2026 Pazartesileri Yükle" tıklayın

## Veriler

Tüm veriler `data/` klasöründe JSON olarak saklanır.
Uygulama içi yedekleme: Ayarlar → Veri → "Yedekle"
