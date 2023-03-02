-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 02, 2023 at 07:06 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `password`, `refreshToken`, `created_at`, `updated_at`) VALUES
('', 'trongtien', '$2b$10$N2VDkv0GPrdeDGSMDDStAuQVp6lOWuygZkOYt74gGpK6lV8yFo7L.', NULL, '2023-02-17 13:27:55', NULL),
('e5533b0a-8539-4627-ba7c-c5441e1bca10', 'namanh', '$2b$10$dxM5d8/OYNyatAFeK2a2XuDpAB9x7JJ0QgZWy6uSHepuXkSGH8un.', 'acDgAC5M3HrvnMlWu85UtbaJWSlBr3IaepC087WM3Hm7CTbwaB', '2023-02-17 14:28:21', '2023-02-17 16:03:19');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_id` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chanel_video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `category_id`, `user_id`, `description`, `image`, `audio_url`, `youtube_id`, `chanel_video`, `created_at`, `updated_at`) VALUES
('907e6a1c-4830-4437-b8e1-cd907047d32c', 'Tắt Đèn', '8eee91b1-389b-4382-a766-82413a64a30e', 'e7d7b0d9-87a1-45db-addf-59b3648a02db', 'Tắt đèn là một trong những tác phẩm văn học tiêu biểu nhất của nhà văn Ngô Tất Tố (tiểu thuyết, in trên báo Việt nữ năm 1937).[1] Đây là một tác phẩm văn học hiện thực phê phán với nội dung nói về cuộc sống khốn khổ của tầng lớp nông dân Việt Nam đầu thế kỉ XX dưới ách đô hộ của thực dân Pháp.\r\n', 'upload/image-1677154300426.jpeg', 'https://www.youtube.com/watch?v=XRm7N86AjJk&t=2s', 'https://www.khaitam.com/van-hoc/tat-den-tai-ban-2020', 'https://www.khaitam.com/van-hoc/tat-den-tai-ban-2020', '2023-02-23 19:11:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
('06bb3070-67a9-42ca-8931-332441fe32ff', 'Tôn Giáo', '2023-02-23 19:09:58', NULL),
('19331b3f-ed38-4ca9-a9c0-8cec0caabbd1', 'Sách Kỹ Năng', '2023-02-23 19:10:27', NULL),
('8eee91b1-389b-4382-a766-82413a64a30e', 'Văn Học Việt Nam', '2023-02-23 19:09:33', NULL),
('9cdc911b-b101-41da-bd04-dc59c0706dbd', 'Sách Trẻ Em', '2023-02-23 19:10:36', NULL),
('bf8b16d0-e408-49a2-a6af-c36256ea76d1', 'Lịch Sử', '2023-02-23 19:10:49', NULL),
('c3f89312-833b-4437-ab9e-c1c77f906f5d', 'Kinh Tế Học', '2023-02-23 19:10:10', NULL),
('f045227e-7402-40cf-b0bc-bf36970d9576', 'Văn Học Nước Ngoài', '2023-02-23 19:09:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chanel_id` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chanel_url` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `chanel_id`, `chanel_url`, `created_at`, `updated_at`) VALUES
('44a9df2c-362c-4280-8fae-9c5477c55940', 'nam cao', NULL, NULL, '2023-02-24 18:15:07', NULL),
('50bf1423-6c3c-46b2-94e2-31711638fd1f', 'Vũ Trọng Phụng', NULL, NULL, '2023-02-23 21:04:46', NULL),
('e7d7b0d9-87a1-45db-addf-59b3648a02db', 'Ngô Tất Tố', NULL, NULL, '2023-02-23 18:38:57', NULL),
('eed5c8ab-b11b-44be-8aa2-cc32cd4a6c97', 'Kim Lan', NULL, NULL, '2023-02-24 18:13:56', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
