-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 29, 2022 at 02:08 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
(3, 'Chaises rouges', 'Un ensemble de chaises rouges qui nont rien de particulier', 50, '2022-06-29 15:49:51', 'https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/b3/d4/efb3d43a9cdaa43f37f0fd9e30c2d2a48ddcab19.jpg', 'chaises');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `isAdmin`, `phoneNumber`) VALUES
(1, 'marine@gmail.com', 'root', 1, '0897876787'),
(2, 'marine@gmail.com', 'root', 1, '0897876787');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
