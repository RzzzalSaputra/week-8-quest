# Aplikasi Manajemen Peminjaman Buku

[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://github.com/username/projectname/releases)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md)

## Deskripsi

Aplikasi manajemen peminjaman buku untuk "Markas Baca". Aplikasi ini dirancang untuk membantu pengelolaan peminjaman buku dan mengoptimalkan operasi toko buku milik Pak Mulyono.

## Feature

- Pengelolaan kategori buku
- Pengelolaan data penulis buku
- Pengelolaan data buku
- Pengelolaan peminjaman buku
- Kalkulasi denda apabila telat mengembalikan buku
- Manajemen stok buku

## Cara Menjalankan Project

1. Install dependencies:
    ```bash
    npm install
    ```

2. Jalankan aplikasi:
    ```bash
    npm start
    ```

3. Test akses API di URL berikut: 
    ```
    http://localhost:3000/api/v1/test/health
    ```

## API Specs

### Books

| Method | Endpoint       | Description                       |
|--------|----------------|-----------------------------------|
| GET    | `/books`       | Mendapatkan list buku             |
| GET    | `/book/:id`    | Mendapatkan detail buku           |
| POST   | `/book`        | Menambahkan data buku baru        |
| PUT    | `/book/:id`    | Mengupdate buku                   |
| DELETE | `/book/:id`    | Menghapus buku                    |
| POST   | `/book/upload` | Mengupload sampul buku            |

### Author

| Method | Endpoint       | Description                       |
|--------|----------------|-----------------------------------|
| GET    | `/authors`     | Mendapatkan list author           |
| GET    | `/author/:id`  | Mendapatkan detail author         |
| POST   | `/author`      | Menambahkan data author baru      |
| PUT    | `/author/:id`  | Mengupdate author                 |
| DELETE | `/author/:id`  | Menghapus author                  |
| POST   | `/author/upload` | Mengupload foto author          |

### Category

| Method | Endpoint       | Description                       |
|--------|----------------|-----------------------------------|
| GET    | `/categories`   | Mendapatkan list kategori         |
| GET    | `/category/:id` | Mendapatkan detail kategori       |
| POST   | `/category`     | Menambahkan data kategori baru    |
| PUT    | `/category/:id` | Mengupdate kategori               |
| DELETE | `/category/:id` | Menghapus kategori                |

### Peminjam

| Method | Endpoint       | Description                       |
|--------|----------------|-----------------------------------|
| GET    | `/borrowers`   | Mendapatkan list peminjam        |
| GET    | `/borrower/:id` | Mendapatkan detail peminjam      |
| POST   | `/borrower`    | Menambahkan data peminjam baru    |
| PUT    | `/borrower/:id` | Mengupdate peminjam              |
| DELETE | `/borrower/:id` | Menghapus peminjam               |

### Stock

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/stocks`        | Mendapatkan list stok                |
| POST   | `/stock`         | Menambahkan data stok baru           |
| PUT    | `/stock/:id`     | Mengupdate data stok                 |
| DELETE | `/stock/:id`     | Menghapus data stok                  |


### Pinjam Buku

| Method | Endpoint                  | Description                                   |
|--------|---------------------------|-----------------------------------------------|
| POST   | `/borrow/book`            | Menambahkan data peminjam buku                |
| GET    | `/borrow/book/list`       | Mendapatkan list data peminjam buku yang aktif |
| POST   | `/borrow/book/return`     | Menambahkan data pengembalian buku            |
