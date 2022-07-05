-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 05, 2022 at 01:56 PM
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
(3, 'Tabouret', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:49:51', 'https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/b3/d4/efb3d43a9cdaa43f37f0fd9e30c2d2a48ddcab19.jpg', 'chaises'),
(4, 'Table Rétro', 'Belle table rétro années 70', 5000, '2022-07-05 14:14:49', 'https://cdn.manomano.com/images/images_products/5380911/P/23442578_1.jpg', 'Tables'),
(5, 'Table en chêne massif', 'Belle table en chêne massif millénaire', 9000, '2022-07-05 14:45:39', 'https://i.etsystatic.com/9276932/r/il/4aaa44/2730904336/il_570xN.2730904336_a6bm.jpg', 'Tables'),
(6, 'Table en érable massif', 'Belle table en érable massif millénaire', 6000, '2022-07-05 14:46:37', 'https://www.cuisines-viaud.com/wp-content/uploads/2020/04/Fabrication-Table-en-chene-massif-sur-mesure-Vendee-Artisan-G-Viaud6.jpg', 'Tables'),
(7, 'Canapés en chêne massif', 'Beau canapé en chêne massif millénaire', 9000, '2022-07-05 14:49:33', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZx52DQRFhFC36UF-U1GU3aHWPE-niWpMuLfCLqw02LXiQbgQ5y9HTicVB0xZhEjfM2Jo&usqp=CAU', 'Canapés'),
(8, 'Canapés en cuir', 'Canapé en cuir de vache d\'Aubrac', 800, '2022-07-05 14:50:58', 'https://cdn1.vente-unique.com/thumbnails/product/91/91839/gallery_slider/lg/canape_266627.webp', 'Canapés'),
(9, 'Canapés en velours', 'Canapé en velours émeraude', 700, '2022-07-05 14:51:56', 'https://www.decoinparis.com/img/produit/20857-canape-3-places-capitonne-chesterfield-velours-vert-carmen.jpg', 'Canapés');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
