# Mobil Anket Uygulaması

Mobil Anket Uygulaması, kullanıcıların çeşitli konularda anket sorularını doldurmasına, sonuçları görüntülemesine ve farklı anket türleri arasında kolayca gezinmesine olanak tanıyan modern ve kullanıcı dostu bir mobil uygulamadır. Bu doküman, uygulamanın kurulumundan kullanımına, kod yapısından özelliklerine kadar geniş bir yelpazede bilgi sunmaktadır.

## İçindekiler
- [Giriş](#giriş)
- [Kurulum](#kurulum)
  - [Gereksinimler](#gereksinimler)
  - [Adımlar](#adımlar)
- [Proje Yapısı](#proje-yapısı)
- [Özellikler ve Kullanımı](#özellikler-ve-kullanımı)
  - [Giriş ve Kayıt Olma](#giriş-ve-kayıt-olma)
  - [Ana Sayfa](#ana-sayfa)
  - [Anket Modülü](#anket-modülü)
  - [Sonuçlar](#sonuçlar)
  - [Temalar ve Dil Desteği](#temalar-ve-dil-desteği)
- [Kod Açıklamaları](#kod-açıklamaları)
  - [Navigasyon](#navigasyon)
  - [State Yönetimi](#state-yönetimi)
  - [API Entegrasyonu](#api-entegrasyonu)
  - [Özel Bileşenler](#özel-bileşenler)
- [Performans ve Optimizasyon](#performans-ve-optimizasyon)
- [Hata Yönetimi](#hata-yönetimi)
- [Ekstra Özellikler](#ekstra-özellikler)
- [Testler](#testler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Katkıda Bulunanlar](#katkıda-bulunanlar)
- [Lisans](#lisans)
- [İletişim](#iletişim)

## Kurulum

### Gereksinimler
- **Node.js:** [Node.js İndir](https://nodejs.org)
- **Expo CLI:** Global olarak yüklü olması gerekir. Yüklemek için:
    ```bash
    npm install -g expo-cli
    ```
- **Git:** [Git İndir](https://git-scm.com/)

### Adımlar

1. Depoyu klonlayın:
    ```bash
    git clone https://github.com/batuberque/survey-app.git
    ```

2. Proje dizinine gidin:
    ```bash
    cd survey-app
    ```

3. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

4. Uygulamayı başlatın:
    ```bash
    npm start
    ```

5. Mobil cihazda çalıştırmak için:
    - Expo uygulamasını mobil cihazınıza indirin.
    - QR kodunu taratarak uygulamayı cihazınızda başlatın.
    - IOS cihazda test edilmesi tavsiye edilir.

## Proje Yapısı

Proje, **React Native** ve **Expo** kullanılarak geliştirilmiştir. Ana dizin yapısı ve önemli dosyalar şu şekildedir:
Expo-router, file system router kullanılmıştır.

```bash
survey-app/
├── app/
│   ├── _layout/
│   ├── (tabs)/
│   │   ├── survey/
│   │   │   ├── _layout.tsx
│   │   │   └── survey.ts
│   components/
│   hooks/
│   redux/
│   ...
├── assets/
├── node_modules/
├── package.json
├── tsconfig.json
└── ...
```

## Özellikler ve Kullanımı

### Giriş ve Kayıt Olma

#### Giriş Ekranı
- **Input Alanları:** Kullanıcı adı ve şifre giriş alanları state yönetimi ile kontrol edilmektedir.
- **Giriş İşlemi:** Fake Store API kullanılarak API üzerinden statik giriş işlemi yapılmaktadır.
- **Global Bileşenler:** Dil ve karanlık mod desteği için global bileşenler entegre edilmiştir.
- **Navigasyon:** Geri butonu bulunmamaktadır; navigasyon tab kısmından yönetilmektedir.

#### Kayıt Ol Ekranı
- **State Yönetimi:** Kullanıcı kayıt olurken input alanları state üzerinden kontrol edilmektedir.
- **Form Doğrulama:**
  - Tüm input alanları dolu olmalıdır.
  - KVKK onayı verilmelidir.
  - Şartlar sağlanmazsa kayıt butonu devre dışı bırakılır.
- **Navigasyon:** Kayıt ol ekranından giriş ekranına geçiş alt kısımdaki "Login" butonu ile sağlanmaktadır.

### Ana Sayfa
- **Temalar ve Dil Desteği:** Karanlık mod ve çoklu dil desteği bulunmaktadır.
- **Çıkış Yap:** Kullanıcı uygulamadan çıkış yapabilir.
- **Anket Başlat:** Kullanıcı, "Start Survey" butonu ile anket seçimi yapabilir.
- **Karanlık Mod:** Karanlık mod provider olarak tanımlanmıştır.

### Anket Modülü
- **Zamanlayıcı:** useTimer hook'u ile kullanıcının anket süresi takip edilmektedir.
- **Dinamik Soru Yapısı:** Sorular survey.ts dosyasından dinamik olarak çekilmektedir.
- **Navigasyon Yapısı:** Anket modülüne özgü navigasyon yapılandırılmıştır.

### Sonuçlar
- **Anket Sonuçları Görüntüleme:** Kullanıcı, tamamladığı anketlerin sonuçlarını detaylı bir şekilde görebilir.
- **Gelişmiş Analiz:** Detaylı analiz ve raporlama arayüzü bulunmaktadır.

### Temalar ve Dil Desteği
- **Karanlık Mod:** Uygulama genelinde desteklenmektedir, ancak bazı renk hataları olabilir.
- **Çoklu Dil Desteği:** i18n ile sağlanmış, ancak tüm alanlarda uygulanmamış olabilir.

## Kod Açıklamaları

### Navigasyon
- **Expo Router:** Navigasyon yapısı expo-router ile oluşturulmuştur.
- **Dinamik URL:** Kod karmaşıklığını azaltmak için dinamik URL yapısı tercih edilmiştir.

### State Yönetimi
- **Redux & Redux Slice:** Uygulama genelinde state yönetimi için kullanılmıştır.
- **Redux Persist:** Verilerin kalıcı olması için redux-persist kullanılmıştır.
- **AsyncStorage:** Lokal depolama için kullanılmıştır.

### API Entegrasyonu
- **Fake Store API:** Giriş işlemleri için Fake Store API kullanılmıştır.
- **Axios:** API istekleri için Axios kullanılmıştır.

### Özel Bileşenler
- **Tamagui:** UI bileşenlerinin oluşturulmasında kullanılmıştır.

## Performans ve Optimizasyon
- **Code Splitting:** Kod bölme stratejileri kullanılmıştır.
- **Memoization:** React.memo ve useMemo gibi yöntemlerle gereksiz renderlar önlenmiştir.
- **SOLID Prensipleri:** Uygulama, SOLID prensiplerine uygun olarak geliştirilmiştir.

## Hata Yönetimi
- **Toast Notifications:** Hata ve başarı mesajları için toast bildirimleri entegre edilmiştir.

## Kullanılan Teknolojiler
- **TypeScript**
- **Expo**
- **Tamagui**
- **Redux & Redux Slice**
- **Redux Persist & AsyncStorage**

## Katkıda Bulunanlar
- **Batuhan Berk**: [batuberque](https://github.com/batuberque)

