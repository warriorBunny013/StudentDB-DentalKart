-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 11, 2023 at 05:13 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `rollno` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `institute` varchar(200) NOT NULL,
  `course` varchar(200) NOT NULL,
  PRIMARY KEY (`rollno`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`rollno`, `name`, `address`, `institute`, `course`) VALUES
('962005', 'rohini', '10/1, Main Street, Gandhi Nagar, Bangalore - 560008, Karnataka', 'LMN Institute of Technology', '	Bachelors of Technology'),
('1962001', 'Aarav', '10/1, Main Street, Gandhi Nagar, Bangalore - 560008, Karnataka', 'LMN Institute of Technology', 'Bachelors of Technology'),
('1473502', 'Dhruv', 'Door No. 12-2-417/A, Bank Colony Road, Ruknuddin Bagh, Hyderabad - 500032, Telangana', 'DEF Management Institute', 'Masters of Business Administration'),
('1762503', 'Sahil', 'H.No. 8-2-123/456, Sri Nagar Colony, Road No. 1, Banjara Hills, Hyderabad - 500034, Telangana', 'MNO Medical College', 'Bachelor of Unani Medicine and Surgery');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'M Fikri', 'email@gmail.com', '$2b$10$Wr4EunRyINxZpyEWft9weuS6e04KuGYnLhuiiiKTiPTrDcv3ftv4i', NULL, '2021-10-26 04:41:29', '2021-10-26 07:18:50'),
(2, 'John Doe', 'john@gmail.com', '$2b$10$xp6VYwckwTrjhUCWgf5X3u4lFZq/NDC0/PGPh9TFT0lDICNDriPla', NULL, '2021-10-31 15:18:26', '2021-11-02 03:51:10'),
(3, 'Uditi Das', 'mona23sonai@gmail.com', '$2b$10$uImsrSiiOv77kPkL0/CRVuzQYzY74IZYy/alfzHLr5tiDWm.P0S1O', NULL, '2023-03-11 10:13:40', '2023-03-11 11:13:52'),
(4, 'kalu', 'kalu@gmail.com', '$2b$10$uPP68TL2usUU.mFMcjsjMuBpkArYdc7eQEHa5ubQl1mloEZJC4ZSO', NULL, '2023-03-11 10:57:08', '2023-03-11 10:57:08'),
(5, 'kalu', 'kalu@gmail.com', '$2b$10$DB2BlspxDAc5VM04QE13ouHKlpTr0/.lQp7ft2xDX7zw8xq3A24pi', NULL, '2023-03-11 10:57:24', '2023-03-11 10:57:24'),
(6, 'poochie', 'poochie@gmail.com', '$2b$10$fWruwSj926fVjeeB0bPSQ.bmrOm93KfSX79MWihSVr7tlZl5gdka6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiJwb29jaGllIiwiZW1haWwiOiJwb29jaGllQGdtYWlsLmNvbSIsImlhdCI6MTY3ODU1NDI1OSwiZXhwIjoxNjc4NzI3MDU5fQ.pMMKPUn-uNxnYR_j8d8H-yLwXFNnDqhOcc6C8Jp8gY8', '2023-03-11 11:14:24', '2023-03-11 17:04:19'),
(7, 'baba', 'baba@gmail.com', '$2b$10$FeNLbGpfOONJ4hVvbxrUqe0hreKGIYaztlMLTlNSDaGNY2VjeVlHW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJiYWJhIiwiZW1haWwiOiJiYWJhQGdtYWlsLmNvbSIsImlhdCI6MTY3ODU1MTk0NywiZXhwIjoxNjc4NzI0NzQ3fQ.8vr50Ib5t_MYWSQDpmswlV-0fzgEAK9yqX_PhyRQpMQ', '2023-03-11 12:37:10', '2023-03-11 16:25:47');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
