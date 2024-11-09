# CT648_pokemon_gashapon
## 1. หลักการพัฒนา ด้วย React TypeScript, Node.js Backend และ PostgreSQL
![CT648_pokemon_gashapon drawio](https://github.com/user-attachments/assets/29b76ea8-6120-4dc0-a429-743658f10a63)

โปรเจคถูกออกแบบมาประกอบด้วย 3 ส่วนหลัก:

1. **Frontend**: พัฒนาด้วย React TypeScript เพื่อสร้าง UI ที่ตอบสนองและมีประสิทธิภาพ
2. **Backend**: พัฒนาด้วย Node.js กับ Express เพื่อสร้าง RESTful API ที่รวดเร็วและมีประสิทธิภาพ
3. **Database**: ใช้ PostgreSQL เพื่อจัดเก็บข้อมูลผู้ใช้, เก็บข้อมูลรูปภาพของโปเกมอน, เก็บข้อมูลพื้นฐานของโปเกมอน เช่น ชื่อและระดับความหายาก, เก็บข้อมูลโปเกมอนที่ผู้ใช้สะสมไว้

## 2. API ที่สำคัญ
API ที่พัฒนาขึ้นครอบคลุมทั้งการจัดการข้อมูลผู้ใช้และการเล่นเกม ซึ่งมีรายละเอียดดังนี้
### 2.1 API จัดการข้อมูลผู้ใช้
#### POST /api/register
- ลงทะเบียนผู้ใช้ใหม่โดยรับ user_name และ pass จาก client
- ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่ จากนั้นเข้ารหัสรหัสผ่านด้วย bcrypt ก่อนบันทึกข้อมูลในฐานข้อมูล
- ส่ง user_id ของผู้ใช้ใหม่กลับไปหากการลงทะเบียนสำเร็จ
#### POST /api/login
- ตรวจสอบชื่อผู้ใช้และรหัสผ่านที่เข้ารหัสในฐานข้อมูล โดยใช้ bcrypt.compare() เพื่อตรวจสอบความถูกต้องของรหัสผ่าน
- หากเข้าสู่ระบบสำเร็จ จะส่ง user_id และชื่อผู้ใช้ (user_name) กลับไปในรูปแบบ JSON
#### GET /api/user_wl
- ใช้ user_id ที่ส่งมาผ่าน query string เพื่อดึงข้อมูลชนะ/แพ้ของผู้ใช้จากตาราง user_wl สำหรับแสดงผลสถิติการเล่นของผู้ใช้
#### POST /api/update-history
- อัปเดตประวัติการชนะหรือแพ้ของผู้ใช้ในตาราง user_wl โดยใช้ user_id และ result ที่ส่งมาจาก client เพื่อระบุผลการเล่น (win หรือ loss)
### 2.2 API ที่เกี่ยวข้องกับเกมโปเกมอน
#### GET /api/pokemon
- ดึงข้อมูลโปเกมอนทั้งหมดจากตาราง pokemon ในฐานข้อมูล PostgreSQL เพื่อให้ frontend ใช้แสดงรายการโปเกมอนที่มีอยู่ทั้งหมด
#### GET /api/pic_poke
- รับ pok_name ใน query string เพื่อดึงรูปภาพของโปเกมอนจากตาราง pic_poke และส่งกลับไปในรูปแบบ Base64 เพื่อนำไปแสดงผลในแอปพลิเคชัน
### 2.3 API การสุ่มและสะสมการ์ดโปเกมอน
#### GET /api/random-pokemon
- ทำการสุ่มโปเกมอนและอัปเดตจำนวนครั้งที่สุ่ม (consecutive_pulls) ของผู้ใช้ โดยการสุ่มครั้งที่ 6 จะได้รับการ์ด rare และรีเซ็ต consecutive_pulls เป็น 0 
common: 70%
uncommon: 20%
rare: 10%
- ดึงรูปภาพโปเกมอนจากตาราง pic_poke และส่งข้อมูลทั้งหมดกลับไปให้ client
#### GET /api/drop-rates
- ส่งอัตราการดรอปการ์ดในแต่ละระดับความหายาก (common, uncommon, rare) กลับไปในรูปแบบ JSON เพื่อให้ client แสดงอัตราการดรอปแก่ผู้ใช้
#### POST /api/duplicate-pokemon
- ใช้ userId และ pokemonId เพื่อเช็คว่าผู้ใช้มีโปเกมอนตัวนี้ในคอลเล็กชันอยู่หรือไม่ หากมีอยู่แล้ว จะเพิ่ม power_up_points ของโปเกมอนตัวนั้นขึ้น หากไม่มี ระบบจะเพิ่มโปเกมอนตัวนี้เข้าไปในคอลเล็กชันของผู้ใช้
### 2.4 API สำหรับจัดการข้อมูลโปเกมอนที่สะสม
#### GET /api/user-collection
- ดึงคอลเล็กชันโปเกมอนทั้งหมดของผู้ใช้ที่มีในตาราง user_pokemon และ pokemon พร้อมดึงรูปภาพที่มีอยู่ในตาราง pic_poke มาด้วย เพื่อนำไปแสดงผลในหน้าคอลเล็กชันของผู้ใช้
#### GET /api/user-pokemon-points
- ดึงข้อมูล power_up_points ของโปเกมอนที่ผู้ใช้สะสมไว้ โดยใช้ user_id และ pokemon_id เป็นตัวระบุเพื่อให้ผู้ใช้ทราบข้อมูลค่าพลังสะสมของโปเกมอนแต่ละตัว

# 3. การใช้งาน init.sql
ไฟล์ init.sql ใช้สำหรับการสร้างโครงสร้างฐานข้อมูลเริ่มต้น โดยมีการสร้างตารางดังนี้

   1. user_id: เก็บข้อมูลผู้ใช้งาน
   2. pokemon: ใช้สำหรับสุ่มและจัดการข้อมูลโปเกมอน เก็บข้อมูลโปเกมอน
   3. pic_poke: ภาพของ Pokemon 
   4. user_pokemon:การสะสม Pokemon ของผู้เล่น collection
   5. user_wl: บันทึกจำนวนครั้งผู้เล่น 

ไฟล์นี้จะถูกรันอัตโนมัติเมื่อ Docker container สำหรับ PostgreSQL เริ่มทำงาน ทำให้ฐานข้อมูลพร้อมใช้งานทันทีหลังจาก deploy

# โครงสร้าง Code
CT648_POKEMON_GASHAPON
├── pokemon_gashapon_backend
│   ├── .gitignore
│   ├── bun.lockb
│   ├── Dockerfile
│   ├── index.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── server.js
│   └── tsconfig.json
├── pokemon_gashapon_front
│   ├── public
│   ├── src
│   ├── bun.lockb
│   ├── bunfig.toml
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json 
│   ├── tsconfig.json
│   ├── yarn.lock
├── README.md
├── docker-compose.yml
├── init.sql

Frontend
   - ใช้ React TypeScript
   - ใช้ Axios สำหรับการเรียก API
   - สร้าง Component
        ใช้ React Function Component (React.FC<GameProps>) พร้อมพารามิเตอร์ username และ onLogout ที่ส่งเข้ามาผ่าน props.
        ใช้ State และ Effect Hooks เช่น useState, useEffect เพื่อจัดการข้อมูลและสถานะต่างๆ เช่น:
        isCracking: ตรวจสอบว่าไข่ Pokémon กำลังแตกหรือไม่
        randomCard: เก็บข้อมูล Pokémon ที่สุ่มได้
        dropRates: อัตราการดรอปของ Pokémon
        volume, isMuted: ควบคุมเสียงพื้นหลัง
<img width="1430" alt="Screenshot 2567-11-09 at 15 14 52" src="https://github.com/user-attachments/assets/5ec6bbd0-9f0e-427c-b7ad-b659d4552c8b">

Backend
   - ใช้ Express.js สำหรับสร้าง RESTful API
   - เชื่อมต่อกับ PostgreSQL ผ่าน pg module
   - ใช้ bcrypt สำหรับการเข้ารหัสรหัสผ่าน
<img width="388" alt="Screenshot 2567-11-09 at 15 27 21" src="https://github.com/user-attachments/assets/a28064dd-779f-4d69-9c31-559a5426a492">

Database
   - ใช้ PostgreSQL
   - มีการสร้างตารางและความสัมพันธ์ตามที่กำหนดใน init.sql
     <img width="695" alt="Screenshot 2567-11-08 at 22 21 18" src="https://github.com/user-attachments/assets/edf247b3-31eb-4590-9e2a-ea890134a346">
<img width="868" alt="Screenshot 2567-11-09 at 15 28 08" src="https://github.com/user-attachments/assets/a57ee7a5-8065-4d23-9304-a68c8c4b9b5d">

# การทำงานของเกม
- เริ่มเกม
     เมื่อผู้ใช้คลิกที่เครื่องกาชาปอง (handleMachineClick) จะเริ่มเกม และแสดงไข่ Pokémon
- สุ่ม Pokémon
     เมื่อคลิกที่ไข่ (handleEggClick):
          ดึงข้อมูล Pokémon ผ่าน API
          แสดงการ์ด Pokémon พร้อมสถิติต่างๆ (HP, Attack, Defense)
          เก็บประวัติ Pokémon ที่ได้รับไว้ใน history
- อัปเดตข้อมูล Pokémon
     ใช้ handlePokemonObtained เพื่อตรวจสอบว่า Pokémon ที่ได้รับซ้ำหรือไม่ และอัปเดต Power-up Points ผ่าน API

# การพัฒนาเพิ่มเติม
หากต้องการพัฒนาหรือแก้ไขโค้ด

   สำหรับ Frontend: แก้ไขไฟล์ใน Folder pokemon_gashapon_front
   
   สำหรับ Backend: แก้ไขไฟล์ใน Folder pokemon_gashapon_backend
   
   สำหรับ Database: แก้ไขไฟล์ init.sql หรือปรับแต่งการเชื่อมต่อใน Backend

# Credit Database
     ```
https://www.kaggle.com/datasets/divyanshusingh369/complete-pokemon-library-32k-images-and-csv?resource=download
     ```

## 4. วิธี Deploy

### ข้อกำหนดเบื้องต้น
- Node.js (v18)
- Docker และ Docker Compose
- PostgreSQL
- Bun (สำหรับ Frontend)

## 4.1 นำโค้ดทั้งหมดขึ้นมาไว้ที่ GitHub
โดยมีไฟล์ที่นี้มีบทบาทสำคัญในการ จัดการการทำงานและการรันโปรเจกต์ในสภาพแวดล้อมของ Docker ดังนี้

Dockerfile (ทั้งใน Path ของ backend และ frontend)
- ใช้กำหนดวิธีการสร้าง Docker image ของแต่ละส่วนของโปรเจกต์ (backend และ frontend)
- ทำให้แอปพลิเคชันแต่ละส่วนสามารถรันในสภาพแวดล้อมที่เหมือนกันทุกครั้ง ไม่ว่าจะรันที่ไหนก็ตาม
## docker-compose.yml
- รวบรวมทุกบริการ (frontend, backend, database) ไว้ในไฟล์เดียว
- ทำให้การจัดการและการรันหลายบริการพร้อมกันง่ายขึ้น โดยสามารถใช้คำสั่งเดียวในการรันทั้งโปรเจกต์

## 4.2 Clone โปรเจกต์
- เชื่อมต่อไปยังเซิร์ฟเวอร์ ใช้ SSH เพื่อเข้าถึงเซิร์ฟเวอร์ (เช่น AWS EC2)
- Clone โปรเจกต์จาก GitHub ลงเซิร์ฟเวอร์
     ```
        git clone https://github.com/66130662/CT648_pokemon_gashapon-master.git
     ```
   
    ```
       cd CT648_pokemon_gashapon/
     ```
## 4.3 Build และ Start Services

  ```
  sudo docker-compose up --build -d
 ```
## 4.4 เข้าใช้งาน
- เข้าใช้งานหน้าเว็บโดย URL หรือ IP ของเครื่องที่ให้รัน Frontend: http://localhost:3000
- Backend: http://localhost:3001
- http://13.215.67.233:3000/login

