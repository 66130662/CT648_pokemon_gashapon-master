import React from "react";
import backgroundImage from "../assets/images/Test2.jpg";
import { useNavigate } from "react-router-dom";
import "./AboutMe.css";
import teacher from "../assets/images/teacher.png";
import student from "../assets/images/student.jpg";

const AboutMe: React.FC = () => {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อจัดการการนำทาง

  return (
    <div
      className="about-me-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <section className="section1">
        <div className="section_about">
          <h1>
            Welcome to Computer Engineering College of Engineering and
            Technology
          </h1>
          <h2>หลักสูตรวิศวกรรมศาสตรมหาบัณฑิต และ ปรัชญาดุษฎีบัณฑิต</h2>
          <p>สาขาวิชาวิศวกรรมคอมพิวเตอร์</p>

          <p>วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยธุรกิจบัณฑิตย์</p>
          <img
            src={teacher}
            alt="teacher"
            className="teacher"
            style={{ width: "300px", height: "auto" }}
          />
          <h3>ผู้ช่วยศาสตราจารย์ ดร.ชัยพร เขมะภาตะพันธ์</h3>
          <p>ผู้อำนวยการหลักสูตร</p>
          <p>สาขาวิชาวิศวกรรมคอมพิวเตอร์</p>
          <p>วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี</p>
        </div>
      </section>

      <section className="section">
        <h1>About Me - CT648 Pokemon Gashapon</h1>
        <h2>1. หลักการพัฒนา</h2>
        <p>
          การพัฒนาโปรเจกต์นี้ยึดหลักการออกแบบที่เน้นการสร้างระบบ RESTful API
          ที่ใช้งานง่ายและปลอดภัย โดยมีหลักการสำคัญดังนี้:
        </p>
      </section>

      <section className="section">
        <h2>2. API ที่สำคัญ</h2>
        <p>
          API ที่พัฒนาขึ้นครอบคลุมทั้งการจัดการข้อมูลผู้ใช้และการเล่นเกม ดังนี้:
        </p>

        <h3>2.1 API จัดการข้อมูลผู้ใช้</h3>
        <ul>
          <li>
            <strong>POST /api/register</strong> - ลงทะเบียนผู้ใช้ใหม่
            ตรวจสอบชื่อซ้ำ เข้ารหัสรหัสผ่านและส่ง user_id กลับหากสำเร็จ
          </li>
          <li>
            <strong>POST /api/login</strong> - ตรวจสอบชื่อผู้ใช้และรหัสผ่านด้วย
            bcrypt หากเข้าสู่ระบบสำเร็จ จะส่ง user_id และชื่อผู้ใช้กลับในรูปแบบ
            JSON
          </li>
          <li>
            <strong>GET /api/user_wl</strong> - ดึงข้อมูลชนะ/แพ้ของผู้ใช้
            สำหรับแสดงสถิติการเล่น
          </li>
          <li>
            <strong>POST /api/update-history</strong> -
            อัปเดตประวัติการชนะหรือแพ้ ในตาราง user_wl โดยใช้ user_id
            และผลการเล่น (win/loss)
          </li>
        </ul>

        <h3>2.2 API ที่เกี่ยวข้องกับเกมโปเกมอน</h3>
        <ul>
          <li>
            <strong>GET /api/pokemon</strong> -
            ดึงข้อมูลโปเกมอนทั้งหมดจากฐานข้อมูล สำหรับแสดงรายการโปเกมอน
          </li>
          <li>
            <strong>GET /api/pic_poke</strong> - รับ pok_name ใน query string
            เพื่อดึงรูปภาพของโปเกมอน
          </li>
        </ul>

        <h3>2.3 API การสุ่มและสะสมการ์ดโปเกมอน</h3>
        <ul>
          <li>
            <strong>GET /api/random-pokemon</strong> - สุ่มโปเกมอน
            อัปเดตจำนวนครั้งที่สุ่ม ทุก 6 ครั้งจะได้รับการ์ด rare
          </li>
          <li>
            <strong>GET /api/drop-rates</strong> -
            ส่งอัตราการดรอปการ์ดแต่ละระดับ (common, uncommon, rare) ในรูปแบบ
            JSON
          </li>
          <li>
            <strong>POST /api/duplicate-pokemon</strong> -
            ตรวจสอบการมีอยู่ของโปเกมอนในคอลเล็กชัน เพิ่มค่า power_up_points
            หากมีโปเกมอนซ้ำ
          </li>
        </ul>

        <h3>2.4 API สำหรับจัดการข้อมูลโปเกมอนที่สะสม</h3>
        <ul>
          <li>
            <strong>GET /api/user-collection</strong> -
            ดึงคอลเล็กชันโปเกมอนของผู้ใช้ทั้งหมด พร้อมรูปภาพ
          </li>
          <li>
            <strong>GET /api/user-pokemon-points</strong> - ดึงข้อมูล
            power_up_points ของโปเกมอนที่ผู้ใช้สะสมไว้
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>3. วิธี Deploy</h2>
        <h3>3.1 นำโค้ดทั้งหมดขึ้น GitHub</h3>
        <p>
          โดยมีไฟล์ Dockerfile และ docker-compose.yml
          สำหรับการจัดการสภาพแวดล้อมของโปรเจกต์:
        </p>
        <ul>
          <li>
            <strong>Dockerfile</strong> - กำหนดวิธีการสร้าง Docker image ของ
            backend และ frontend
          </li>
          <li>
            <strong>docker-compose.yml</strong> -
            รวบรวมทุกบริการในไฟล์เดียวสำหรับการรันพร้อมกัน
          </li>
          <li>
            <strong>nginx.conf</strong> - ใช้ Nginx เป็น reverse proxy ระหว่าง
            frontend และ backend
          </li>
        </ul>

        <h3>3.2 Clone โปรเจกต์</h3>
        <pre>
          git clone https://github.com/ARRUKlib/CT648_Pokamon_Slots.git cd
          CT648_pokemon_gashapon/
        </pre>

        <h3>3.3 Build และ Start Services</h3>
        <pre>sudo docker-compose up sudo docker-compose up --build -d</pre>

        <h3>3.4 เข้าใช้งาน</h3>
        <p>
          URL หรือ IP ของเซิร์ฟเวอร์:
          <br />
          Frontend: <a href="http://localhost:3000">http://localhost:3000</a>
          <br />
          Backend: <a href="http://localhost:3001">http://localhost:3001</a>
          <br />
          Example:{" "}
          <a href="http://13.215.67.233:3000/login">13.215.67.233:3000/login</a>
        </p>
      </section>

      {/* ปุ่มกลับหน้า Game */}
      <button className="back-button" onClick={() => navigate("/game")}>
        กลับหน้า Game
      </button>
      <section className="section1">
        <div className="section_about">
          <h1>จัดทำโดย</h1>

          <h2>66130662 หทัยรัตน์ เจนวิทยา</h2>
          <p>คณะวิศวกรรมคอมพิวเตอร์</p>
          <p>สาขาวิศวกรรมคอมพิวเตอร์</p>

          <p>วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยธุรกิจบัณฑิตย์</p>
          <img
            src={student}
            alt="student"
            className="student"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
