-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 29 juin 2022 à 15:17
-- Version du serveur :  8.0.29-0ubuntu0.20.04.3
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `furniture`
--

-- --------------------------------------------------------

--
-- Structure de la table `furniture`
--

CREATE TABLE `furniture` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` int NOT NULL,
  `created` datetime NOT NULL,
  `img_url` text NOT NULL,
  `category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `furniture`
--

INSERT INTO `furniture` (`id`, `name`, `description`, `price`, `created`, `img_url`, `category`) VALUES
(1, 'Chaises rouges', 'Un ensemble de chaises rouges qui n\'ont rien de particulier', 50, '2022-06-29 15:12:07', 'https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/b3/d4/efb3d43a9cdaa43f37f0fd9e30c2d2a48ddcab19.jpg', 'chaises');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `furniture`
--
ALTER TABLE `furniture`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `furniture`
--
ALTER TABLE `furniture`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;