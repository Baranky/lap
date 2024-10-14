# Proje Kurulumu

# Adım 1: projeyi klonlama
```bash
https://github.com/Baranky/lap.git
````
# adım 2: Docker imajını indirme

```bash
docker-compose up
````
## react için
- http://localhost:3000/
## spring boot için
- http://localhost:8080/
## postgres için
- http://localhost:5432/


## API Endpointleri

### labWorker apileri

- **GET** `/api/worker/`
    -  Tüm personeleri listele.
- **POST** `/api/worker/`
    -  Yeni bir personelleri kaydetme.
- **GET** `/api/worker/{id}`
    - ID'ye göre personel getirme.
- **PUT** `/api/worker/{id}`
    - personeleri günceleme.
- **GET** `/api/worker/search`
  - personeler bilgileri ile arama.
- **GET** `/api/worker/a/{id}`
    - personelin yazdığı raporlar
- **DELETE** `/api/worker/{id}`
    - personel silme.

### patient apileri

- **GET** `/api/patient/`
  - hasta listeleme.
- **POST** `/api/patient/`
    -  Yeni bir hasta kaydetme.
- **GET** `/api/patient/{id}`
    - ID'ye göre hasta getirme.
- **PUT** `/api/patient/{id}`
    - hastaları günceleme.
- **GET** `/api/patient/search`
    - hasta bilgileri ile arama.
- **GET** `/api/patient/a/{id}`
    - bir hastanın tüm raporlari
- **DELETE** `/api/patient/{id}`
    - hasta silme.


### report apileri

- **GET** `/api/report/`
    - rapor listeleme.
- **POST** `/api/report/`
    -  Yeni bir rapor ekleme.
- **GET** `/api/report/{id}`
    - ID'ye göre rapor getirme.
- **PUT** `/api/report/{id}`
    - raporları günceleme.
- **GET** `/api/report/sort`
    - rapor zamana göre sıralama.
- **GET** `/api/report/r/{TC}`
    - hastanın kendi görebileceği raporlar
- **DELETE** `/api/report/{id}`
    - hasta silme.
    - 
### User apileri

- **POST** `/api/user/addNewUser`
    - Yeni bir kullanıcı ekleme.
- **POST** `/api/user/generateToken`
    - Bir kullanıcı için kimlik doğrulama tokeni oluşturma.

    

# alternatif adım
 aşagidaki komutları terminale yazın.
##### Backend image indirin
```bash
docker pull baranky1905/lab-backend
````
##### Frontend image indirin
```bash
docker pull baranky1905/lab-frontend
````
##### veritabanı için postgres image indirin
```bash
docker pull postgres:13
````
##### servislerin aynı ağda çalışmasını sağlamak için  bir ağ oluşturun
```bash
docker network create lab-network
````
##### PostgreSQL containerını başlat
```bash
docker run -d --name postgres-db --network lab-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=1905( your password) -e POSTGRES_DB=lab -p 5432:5432 postgres:13   
````
##### Backend containerını başlat
```bash
docker run -d --name lab-backend --network lab-network -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/Lab -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=1905( your password) -p 8080:8080 baranky1905/lab-backend
````
##### frontend containerını başlat
```bash
docker run -d --name frontend -p 3000:80  baranky1905/frontend
````

