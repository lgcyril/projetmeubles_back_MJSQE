-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 11, 2022 at 08:53 AM
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
(1, 'Chaises rouges', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:08:53', 'https://res.cloudinary.com/dpngcje4c/image/upload/v1657189070/redchair_vkosad.webp', 'chaises'),
(2, 'Chaises vert d\'eau en bois massif épuré', 'Couleur pétante, confort absolu pour les fesses', 60, '2022-06-29 15:48:27', 'https://res.cloudinary.com/dpngcje4c/image/upload/v1657189177/greenchair_apku9s.jpg', 'chaises'),
(3, 'Chaises rouges', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:49:51', 'https://res.cloudinary.com/dpngcje4c/image/upload/v1657189252/rochebobois_cea0po.jpg', 'chaises'),
(4, 'Table Rétro', 'Belle table rétro années 70', 5000, '2022-07-05 14:14:49', 'https://cdn.manomano.com/images/images_products/5380911/P/23442578_1.jpg', 'Tables'),
(5, 'Table en chêne massif', 'Belle table en chêne massif millénaire', 9000, '2022-07-05 14:45:39', 'https://i.etsystatic.com/9276932/r/il/4aaa44/2730904336/il_570xN.2730904336_a6bm.jpg', 'Tables'),
(6, 'Table en érable massif', 'Belle table en érable massif millénaire', 6000, '2022-07-05 14:46:37', 'https://www.cuisines-viaud.com/wp-content/uploads/2020/04/Fabrication-Table-en-chene-massif-sur-mesure-Vendee-Artisan-G-Viaud6.jpg', 'Tables'),
(7, 'Canapés en chêne massif', 'Beau canapé en chêne massif millénaire', 9000, '2022-07-05 14:49:33', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZx52DQRFhFC36UF-U1GU3aHWPE-niWpMuLfCLqw02LXiQbgQ5y9HTicVB0xZhEjfM2Jo&usqp=CAU', 'Canapés'),
(8, 'Canapés en cuir', 'Canapé en cuir de vache d\'Aubrac', 800, '2022-07-05 14:50:58', 'https://cdn1.vente-unique.com/thumbnails/product/91/91839/gallery_slider/lg/canape_266627.webp', 'Canapés'),
(9, 'Canapés en velours', 'Canapé en velours émeraude', 700, '2022-07-05 14:51:56', 'https://www.decoinparis.com/img/produit/20857-canape-3-places-capitonne-chesterfield-velours-vert-carmen.jpg', 'Canapés');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `adresse` text NOT NULL,
  `email` varchar(150) NOT NULL,
  `created` datetime DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `isadmin` tinyint(4) NOT NULL,
  `phonenumber` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `adresse`, `email`, `created`, `password`, `isadmin`, `phonenumber`) VALUES
(1, 'Chillaud', 'Marine', '33 rue du Paradis 75008 Paris', 'marineln@gmail.com', '2022-07-07 20:40:24', 'root', 0, '0897876787'),
(2, 'Luong', 'Cyril', '45 cité du Vatican', 'frPierre@gmail.com', NULL, 'root', 1, '0897876783'),
(3, 'Goriah', 'Sabrina', '45 rue de Maurice 75004 Paris', 'sabcmoi@gmail.com', NULL, 'test', 0, '0933448822'),
(4, 'Chillaud', 'Marine', '45 rue du Tricot 75014 Paris', 'marinec@gmail.com', '2022-07-06 21:29:23', 'test', 0, '0933448822'),
(5, 'Mama', 'Titi', '35 rue des Toto 75005 Paris', 'toto@gmail.com', '2022-07-08 12:21:49', 'test', 0, '0934433443'),
(6, 'Chillaud', 'Eloïne', '35 rue de la Petite Princesse 75012 Paris', 'petiteprincesse@gmail.com', '2022-07-07 10:19:28', 'princesseEloine', 0, '0934433443');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `furniture`
--
ALTER TABLE `furniture`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `furniture`
--
ALTER TABLE `furniture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
