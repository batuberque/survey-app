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

## Proje Yapısı

Proje, **React Native** ve **Expo** kullanılarak geliştirilmiştir. Ana dizin yapısı ve önemli dosyalar şu şekildedir:

```bash
survey-app/
├── app/
│   ├── _layout/
│   ├── (tabs)/
│   │   ├── survey/
│   │   │   ├── _layout.tsx
│   │   │   └── survey.ts
│   ├── components/
│   ├── hooks/
│   ├── navigation/
│   ├── redux/
│   └── ...
├── assets/
├── node_modules/
├── package.json
├── tsconfig.json
└── ...
