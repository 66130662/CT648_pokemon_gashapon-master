# ใช้ Node.js version 18 เป็น base image
FROM node:18

# ตั้งค่า working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies ด้วย npm
RUN npm install

# คัดลอกไฟล์ทั้งหมดไปยัง container
COPY . .

# เปิดพอร์ตที่เซิร์ฟเวอร์จะทำงาน (3001)
EXPOSE 3001

# รันเซิร์ฟเวอร์
CMD ["npm", "start"]