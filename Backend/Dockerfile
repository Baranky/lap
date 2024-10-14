# 1. Derleme aşaması için Maven imajını kullan
FROM maven:3.9.4-eclipse-temurin-21 AS build

# 2. Projeyi konteynere kopyala
WORKDIR /app
COPY . .

# 3. Maven ile projeyi derle
RUN mvn clean package -DskipTests

# 4. Çalıştırma aşaması için OpenJDK imajını kullan
FROM openjdk:21

# 5. Çalışma dizinini ayarla
WORKDIR /app

# 6. Derlenen JAR dosyasını build aşamasından kopyala
COPY --from=build /app/target/lab-0.0.1-SNAPSHOT.jar labApp.jar

# 7. Uygulamayı başlat
ENTRYPOINT ["java", "-jar", "labApp.jar"]
