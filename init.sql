-- สร้างฐานข้อมูล
CREATE DATABASE pokemon_db;

-- ใช้ฐานข้อมูลที่สร้าง
\c pokemon_db;

-- ตารางผู้ใช้งาน
CREATE TABLE user_id (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    consecutive_pulls INT DEFAULT 0
);

-- ตารางข้อมูล Pokémon
CREATE TABLE pokemon (
    pok_id SERIAL PRIMARY KEY,
    pok_name VARCHAR(50) NOT NULL UNIQUE,
    poke_type VARCHAR(50),
    species VARCHAR(50),
    height FLOAT,
    weight FLOAT,
    abilities TEXT,
    catch_rate INT,
    base_friendship INT,
    base_exp INT,
    growth_rate VARCHAR(50),
    hp_base INT,
    hp_min INT,
    hp_max INT,
    attack_base INT,
    attack_min INT,
    attack_max INT,
    defense_base INT,
    defense_min INT,
    defense_max INT,
    special_attack_base INT,
    special_attack_min INT,
    special_attack_max INT,
    special_defense_base INT,
    special_defense_min INT,
    special_defense_max INT,
    speed_base INT,
    speed_min INT,
    speed_max INT,
    poke_type_card VARCHAR(20) -- common, uncommon, rare
);

-- ตารางภาพของ Pokémon
CREATE TABLE pic_poke (
    id SERIAL PRIMARY KEY,
    pok_id INT REFERENCES pokemon(pok_id),
    pok_name VARCHAR(50) NOT NULL UNIQUE,
    pok_image BYTEA NOT NULL
);

-- ตาราง win/loss/draw ของผู้เล่น
CREATE TABLE user_wl (
    user_id INT REFERENCES user_id(user_id),
    win INT DEFAULT 0,
    lose INT DEFAULT 0,
    draw INT DEFAULT 0,
    PRIMARY KEY (user_id)
);

-- ตารางการสะสม Pokémon ของผู้เล่น
CREATE TABLE user_pokemon (
    user_id INT REFERENCES user_id(user_id),
    pokemon_id INT REFERENCES pokemon(pok_id),
    power_up_points INT DEFAULT 0,
    PRIMARY KEY (user_id, pokemon_id)
);

-- เพิ่มข้อมูล Pokémon ตัวอย่าง
INSERT INTO pokemon (pok_name, poke_type, species, height, weight, abilities, catch_rate, base_friendship, base_exp, growth_rate, hp_base, hp_min, hp_max, attack_base, attack_min, attack_max, defense_base, defense_min, defense_max, special_attack_base, special_attack_min, special_attack_max, special_defense_base, special_defense_min, special_defense_max, speed_base, speed_min, speed_max, poke_type_card)
VALUES 
    ('Pikachu', 'Electric', 'Mouse', 0.4, 6.0, 'Static', 190, 70, 112, 'Medium Fast', 35, 10, 50, 55, 20, 40, 40, 15, 30, 50, 25, 40, 50, 25, 40, 90, 40, 100, 'common'),
    ('Bulbasaur', 'Grass/Poison', 'Seed', 0.7, 6.9, 'Overgrow', 45, 70, 64, 'Medium Slow', 45, 20, 60, 49, 15, 35, 49, 15, 35, 65, 30, 50, 65, 30, 50, 45, 25, 60, 'uncommon'),
    ('Charizard', 'Fire/Flying', 'Flame', 1.7, 90.5, 'Blaze', 45, 70, 240, 'Medium Slow', 78, 50, 90, 84, 40, 70, 78, 30, 60, 109, 60, 90, 85, 40, 70, 100, 60, 120, 'rare');

-- เพิ่มภาพ Pokémon ตัวอย่าง
INSERT INTO pic_poke (pok_id, pok_name, pok_image)
VALUES
    (1, 'Pikachu', DECODE('<BASE64_STRING_HERE>', 'base64')),
    (2, 'Bulbasaur', DECODE('<BASE64_STRING_HERE>', 'base64')),
    (3, 'Charizard', DECODE('<BASE64_STRING_HERE>', 'base64'));

-- เพิ่มข้อมูลผู้ใช้งานตัวอย่าง
INSERT INTO user_id (user_name, pass)
VALUES 
    ('trainer_ash', '<HASHED_PASSWORD>');

-- เพิ่มข้อมูล win/loss/draw ของผู้ใช้งานตัวอย่าง
INSERT INTO user_wl (user_id, win, lose, draw)
VALUES 
    (1, 10, 5, 2);

-- เพิ่ม Pokémon ที่สะสมของผู้ใช้งานตัวอย่าง
INSERT INTO user_pokemon (user_id, pokemon_id, power_up_points)
VALUES 
    (1, 1, 3),
    (1, 2, 1);
