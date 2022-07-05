-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 05, 2022 at 12:16 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furniture`
--

-- --------------------------------------------------------

--
-- Table structure for table `furniture`
--

CREATE TABLE `furniture` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `img_url` text NOT NULL,
  `category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `furniture`
--

INSERT INTO `furniture` (`id`, `name`, `description`, `price`, `created`, `img_url`, `category`) VALUES
(1, 'Chaises rouges', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:08:53', 'https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/b3/d4/efb3d43a9cdaa43f37f0fd9e30c2d2a48ddcab19.jpg', 'chaises'),
(2, 'Chaises vert d\'eau en bois massif épuré', 'Couleur pétante, confort absolu pour les fesses', 60, '2022-06-29 15:48:27', 'https://www.conforama.fr/canape-salon-sejour/sejour/chaise/chaise-fredrik-en-velours-vert-d-eau--lot-de-2-/p/J29132888', 'chaises'),
(3, 'Chaises rouges', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:49:51', 'https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/b3/d4/efb3d43a9cdaa43f37f0fd9e30c2d2a48ddcab19.jpg', 'chaises'),
(4, 'Table Rétro', 'Test', 50, '2022-07-05 14:14:49', 'http://toto.jpg', 'Tables');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `furniture`
--
ALTER TABLE `furniture`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `furniture`
--
ALTER TABLE `furniture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
