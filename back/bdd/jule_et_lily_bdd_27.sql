-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 27 Janvier 2020 à 19:38
-- Version du serveur :  5.7.28-0ubuntu0.19.04.2
-- Version de PHP :  7.2.24-0ubuntu0.19.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `jule_et_lily_bdd_27`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `address_firstname` varchar(50) DEFAULT NULL,
  `address_lastname` varchar(50) DEFAULT NULL,
  `address_street` varchar(300) DEFAULT NULL,
  `address_city` varchar(90) DEFAULT NULL,
  `address_country` varchar(40) DEFAULT NULL,
  `address_zip_code` varchar(12) DEFAULT NULL,
  `address_company_name` varchar(100) DEFAULT NULL,
  `is_shipping_address` tinyint(1) DEFAULT NULL,
  `is_billing_address` tinyint(1) DEFAULT NULL,
  `address_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `address`
--

INSERT INTO `address` (`address_id`, `address_firstname`, `address_lastname`, `address_street`, `address_city`, `address_country`, `address_zip_code`, `address_company_name`, `is_shipping_address`, `is_billing_address`, `address_user_id`) VALUES
(1, 'Louis', 'Cascio', '12 rue de la banane', 'Paris', 'France', '75000', 'wildcodeschool', 1, 1, 2),
(2, 'Louis', 'Cascio', '141 rue du boubou', 'boubouland', 'France', '75000', 'boubou company', 1, 1, 2),
(6, 'c', 'd', 'cd rue cd', 'cd', NULL, '1234', 'cd', 1, 1, 5),
(7, 'e', 'f', 'ef rue ef', 'ef', 'ef', '1234', 'ef', 1, 1, 6),
(8, 'g', 'h', 'gh rue gh', 'gh', 'gh', '1234', 'gh', 1, 1, 7),
(9, 'i', 'j', 'ij rue ij', 'ij', 'i', '1234', 'ij', 1, 1, 8),
(10, 'k', 'l', '1 rue kl', 'kl', 'kl', '1234', 'kl', 1, 1, 9),
(12, 'o', 'p', '1 rue op', 'op', 'op', '789', '', 1, 1, 11);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Accessoires cheveux'),
(3, 'Halloween'),
(8, 'Pin\'s'),
(9, 'Minimal'),
(13, 'Bijou personnalisable'),
(19, 'Sac'),
(26, 'Banane'),
(27, 'Décoration murale'),
(28, 'Boucles d\'oreilles'),
(29, 'Broche'),
(30, 'Bijou'),
(31, 'Bonnet'),
(32, 'Texte'),
(33, 'Collier'),
(34, '80\'S'),
(35, '90\'S'),
(36, 'Bague'),
(37, 'Autre');

-- --------------------------------------------------------

--
-- Structure de la table `code_promo`
--

CREATE TABLE `code_promo` (
  `code_promo_id` int(11) NOT NULL,
  `code_promo_name` varchar(50) DEFAULT NULL,
  `code_promo_value` int(11) DEFAULT NULL,
  `code_promo_date_start` date DEFAULT NULL,
  `code_promo_date_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `code_promo`
--

INSERT INTO `code_promo` (`code_promo_id`, `code_promo_name`, `code_promo_value`, `code_promo_date_start`, `code_promo_date_end`) VALUES
(2, 'BlackFriday', 50, '2019-12-20', '2019-12-30'),
(3, 'bijoux', 20, '2020-01-10', '2020-01-26');

-- --------------------------------------------------------

--
-- Structure de la table `collection`
--

CREATE TABLE `collection` (
  `collection_id` int(11) NOT NULL,
  `collection_name` varchar(50) NOT NULL,
  `collection_cover_image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `collection`
--

INSERT INTO `collection` (`collection_id`, `collection_name`, `collection_cover_image_id`) VALUES
(1, 'DISCO LADY', 110),
(2, 'DIA DE LOS MUERTOS', 31),
(3, '90\'S', 28),
(4, 'FLOWER POWER', 104),
(5, 'WOMAN', 53),
(6, 'MINIMAL', 47),
(7, 'FÊTE FORAINE', 108),
(8, 'UNDER THE OCEAN', 51),
(9, 'GRAND CANYON', 42),
(10, 'COSMIC', 29),
(11, 'HAPPY DAYS', 43),
(12, '80\'S FRESH', 25),
(13, 'GIPSY QUEEN', 40),
(14, 'POP MY BEACH', 48),
(15, 'ICE QUEEN', 54),
(16, 'OSIRIS', 56);

-- --------------------------------------------------------

--
-- Structure de la table `header_collection_menu`
--

CREATE TABLE `header_collection_menu` (
  `collection_menu_id` int(11) NOT NULL,
  `collection_menu_background_color` varchar(15) DEFAULT NULL,
  `collection_menu_title` varchar(50) DEFAULT NULL,
  `collection_menu_url` varchar(500) DEFAULT NULL,
  `collection_menu_title_color` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `header_collection_menu`
--

INSERT INTO `header_collection_menu` (`collection_menu_id`, `collection_menu_background_color`, `collection_menu_title`, `collection_menu_url`, `collection_menu_title_color`) VALUES
(1, '#faaadc', 'DIA DE LOS MUERTOS', 'https://juleetlily.com/collection-dia-de-los-muertos/', '#ffffff'),
(2, '#fcd93f', '90\'S', 'https://juleetlily.com/collection-90s/', '#ffffff'),
(3, '#6000c2', 'FLOWER POWER', 'https://juleetlily.com/collection-flower-power/', '#ffffff');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL,
  `image_name` varchar(500) DEFAULT NULL,
  `is_slider_image` tinyint(1) DEFAULT '0',
  `image_url` varchar(500) DEFAULT NULL,
  `image_product_id` int(11) DEFAULT NULL,
  `image_collection_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `image`
--

INSERT INTO `image` (`image_id`, `image_name`, `is_slider_image`, `image_url`, `image_product_id`, `image_collection_id`) VALUES
(5, 'public/1579792181e_e_gun__idle_008.png', 0, 'public/1579792181e_e_gun__idle_008.png', 7, NULL),
(6, 'public/1579792196image.png', 0, 'public/1579792196image.png', 7, NULL),
(22, 'public/1579872911diapo-ice-queen-2.jpg', 1, 'https://juleetlily.com/collection_disco_lady/', NULL, NULL),
(24, 'public/1579872911diapo-dia-de-los-muertos.jpg', 1, 'https://juleetlily.com/personnaliser/', NULL, NULL),
(25, 'public/157987312380s-fresh-vignette.jpg', 0, 'public/157987312380s-fresh-vignette.jpg', NULL, 12),
(28, 'public/1579873301nineties-08.jpg', 0, 'public/1579873301nineties-08.jpg', NULL, 3),
(29, 'public/1579873357jule_et_lily_galaxy2403.jpg', 0, 'public/1579873357jule_et_lily_galaxy2403.jpg', NULL, 10),
(31, 'public/1579873421los-muertos-04-web.jpg', 0, 'public/1579873421los-muertos-04-web.jpg', NULL, 2),
(32, 'public/1579873445crédits-muertos-1.jpg', 0, 'public/1579873445crédits-muertos-1.jpg', NULL, 2),
(40, 'public/1579873779robe-plastron-menthe-carre.jpg', 0, 'public/1579873779robe-plastron-menthe-carre.jpg', NULL, 12),
(42, 'public/1579873832close-up-01.jpg', 0, 'public/1579873832close-up-01.jpg', NULL, 9),
(43, 'public/1579873894jule_et_lily_happy_days-duo-h-01.jpg', 0, 'public/1579873894jule_et_lily_happy_days-duo-h-01.jpg', NULL, 11),
(44, 'public/1579873894credits-happy-days.jpg', 0, 'public/1579873894credits-happy-days.jpg', NULL, 11),
(45, 'public/1579873947crédits-minimal-1.jpg', 0, 'public/1579873947crédits-minimal-1.jpg', NULL, 6),
(47, 'public/1579873976jules-et-lily2300.jpg', 0, 'public/1579873976jules-et-lily2300.jpg', NULL, 6),
(48, 'public/1579874044jule-et-lily-summer1555-carre.jpg', 0, 'public/1579874044jule-et-lily-summer1555-carre.jpg', NULL, 14),
(49, 'public/1579874044credits-pmb-2.jpg', 0, 'public/1579874044credits-pmb-2.jpg', NULL, 14),
(50, 'public/1579874103crédits-uto.jpg', 0, 'public/1579874103crédits-uto.jpg', NULL, 8),
(51, 'public/1579874103jules-et-lily1372_2.jpg', 0, 'public/1579874103jules-et-lily1372_2.jpg', NULL, 8),
(52, 'public/1579874155crédits-woman.jpg', 0, 'public/1579874155crédits-woman.jpg', NULL, 5),
(53, 'public/1579874155insta-fanny-02.jpg', 0, 'public/1579874155insta-fanny-02.jpg', NULL, 5),
(54, 'public/1579874293img_1507-1.jpg', 0, 'public/1579874293img_1507-1.jpg', NULL, 15),
(55, 'public/1579874293crédits-ice-queen.jpg', 0, 'public/1579874293crédits-ice-queen.jpg', NULL, 15),
(56, 'public/1579874383jule_et_lily_egypt0477.jpg', 0, 'public/1579874383jule_et_lily_egypt0477.jpg', NULL, 16),
(57, 'public/1579874383crédits-osiris.jpg', 0, 'public/1579874383crédits-osiris.jpg', NULL, 16),
(62, 'public/1579875137disco-lady-02-05.jpg', 0, 'public/1579875137disco-lady-02-05.jpg', 9, NULL),
(63, 'public/1579875137boucles-doreilles-storm-3.jpg', 0, 'public/1579875137boucles-doreilles-storm-3.jpg', 9, NULL),
(64, 'public/1579875286broche-crâne-2.jpg', 0, 'public/1579875286broche-crâne-2.jpg', 10, NULL),
(65, 'public/1579875286los-muertos-07-2-web.jpg', 0, 'public/1579875286los-muertos-07-2-web.jpg', 10, NULL),
(66, 'public/1579875453nineties-15.jpg', 0, 'public/1579875453nineties-15.jpg', 11, NULL),
(67, 'public/1579875453bagues-memphis-mint-et-noir-3.jpg', 0, 'public/1579875453bagues-memphis-mint-et-noir-3.jpg', 11, NULL),
(68, 'public/1579875851jl-woman-boucles-doreilles-lips-540x540.jpg', 0, 'public/1579875851jl-woman-boucles-doreilles-lips-540x540.jpg', 12, NULL),
(69, 'public/1579875982bagues-elipse.jpg', 0, 'public/1579875982bagues-elipse.jpg', 13, NULL),
(70, 'public/1579876148teddy-b-45.jpg', 0, 'public/1579876148teddy-b-45.jpg', 14, NULL),
(71, 'public/1579876261sea-summer3240.jpg', 0, 'public/1579876261sea-summer3240.jpg', 15, NULL),
(72, 'public/1579876392loup-boucles-doré.jpg', 0, 'public/1579876392loup-boucles-doré.jpg', 16, NULL),
(73, 'public/1579876636jule_et_lily_galaxy_packshot_v22848-1.jpg', 0, 'public/1579876636jule_et_lily_galaxy_packshot_v22848-1.jpg', 17, NULL),
(74, 'public/1579876809jule_et_lily_osiris0740.jpg', 0, 'public/1579876809jule_et_lily_osiris0740.jpg', 18, NULL),
(75, 'public/1579877004sweat-poodle-bleu.jpg', 0, 'public/1579877004sweat-poodle-bleu.jpg', 19, NULL),
(76, 'public/1579877188broche-fresh-prince.jpg', 0, 'public/1579877188broche-fresh-prince.jpg', 20, NULL),
(77, 'public/1579877325boucles-gipsy-cat-blanc.jpg', 0, 'public/1579877325boucles-gipsy-cat-blanc.jpg', 21, NULL),
(78, 'public/1579877471petit-crab-face2.jpg', 0, 'public/1579877471petit-crab-face2.jpg', 22, NULL),
(90, 'public/1580145473pomme-damour-boucles.jpg', 0, 'public/1580145473pomme-damour-boucles.jpg', 23, NULL),
(91, 'public/1580145473pomme-damour-45.jpg', 0, 'public/1580145473pomme-damour-45.jpg', 23, NULL),
(92, 'public/1580145473jules-et-lily1677-2.jpg', 0, 'public/1580145473jules-et-lily1677-2.jpg', 23, NULL),
(93, 'public/1580145473jules-et-lily1688.jpg', 0, 'public/1580145473jules-et-lily1688.jpg', 23, NULL),
(94, 'public/1580145825plastron-daisy.jpg', 0, 'public/1580145825plastron-daisy.jpg', 1, NULL),
(96, 'public/1580145997plastron-daisy.jpg', 0, 'public/1580145997plastron-daisy.jpg', 1, NULL),
(97, 'public/1580145997collier-daisy2.jpg', 0, 'public/1580145997collier-daisy2.jpg', 1, NULL),
(98, 'public/1580145997boucles-daisy-540x540.jpg', 0, 'public/1580145997boucles-daisy-540x540.jpg', 1, NULL),
(99, 'public/1580146168pomme-damour-boucles.jpg', 0, 'public/1580146168pomme-damour-boucles.jpg', 24, NULL),
(100, 'public/1580146168pomme-damour-45.jpg', 0, 'public/1580146168pomme-damour-45.jpg', 24, NULL),
(101, 'public/1580146168jules-et-lily1677-2.jpg', 0, 'public/1580146168jules-et-lily1677-2.jpg', 24, NULL),
(102, 'public/1580146168jules-et-lily1688.jpg', 0, 'public/1580146168jules-et-lily1688.jpg', 24, NULL),
(103, 'public/1580146503crédits-flower-power.jpg', 0, 'public/1580146503crédits-flower-power.jpg', NULL, 4),
(104, 'public/1580146503boucles-doreilles-collier-peacelove-dore.jpg', 0, 'public/1580146503boucles-doreilles-collier-peacelove-dore.jpg', NULL, 4),
(105, 'public/1580146503boucles-doreilles-collier-peacock.jpg', 0, 'public/1580146503boucles-doreilles-collier-peacock.jpg', NULL, 4),
(106, 'public/1580146503broche-peacock.jpg', 0, 'public/1580146503broche-peacock.jpg', NULL, 4),
(107, 'public/1580146503boucles-plastron-daisy.jpg', 0, 'public/1580146503boucles-plastron-daisy.jpg', NULL, 4),
(108, 'public/1580146689feteforaineslanelle-égérie.jpg', 0, 'public/1580146689feteforaineslanelle-égérie.jpg', NULL, 7),
(109, 'public/1580146689fetefor2vignette-ff.jpg', 0, 'public/1580146689fetefor2vignette-ff.jpg', NULL, 7),
(110, 'public/1580147175disco-lady-07-04.jpg', 0, 'public/1580147175disco-lady-07-04.jpg', NULL, 1),
(111, 'public/1580147175disco-lady-09-01.jpg', 0, 'public/1580147175disco-lady-09-01.jpg', NULL, 1),
(112, 'public/1580147175boucles-doreilles-disco-lady-star.jpg', 0, 'public/1580147175boucles-doreilles-disco-lady-star.jpg', NULL, 1),
(113, 'public/1580147229boucledisco-lady-03-03.jpg', 0, 'public/1580147229boucledisco-lady-03-03.jpg', 9, NULL),
(114, 'public/1580147476boucles-crâne.jpg', 0, 'public/1580147476boucles-crâne.jpg', 10, NULL),
(115, 'public/1580147476bague-crâne.jpg', 0, 'public/1580147476bague-crâne.jpg', 10, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `invoice_ref` varchar(200) DEFAULT NULL,
  `invoice_date` datetime(6) DEFAULT NULL,
  `invoice_order_id` int(11) NOT NULL,
  `invoice_promo_code_id` int(11) DEFAULT NULL,
  `invoice_tva` decimal(5,2) DEFAULT '20.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_ref`, `invoice_date`, `invoice_order_id`, `invoice_promo_code_id`, `invoice_tva`) VALUES
(1, '2019-29-11-INVOICE-00001', '2019-11-30 00:00:00.000671', 1, 1, '20.00');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_ref` varchar(200) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `order_status` int(2) DEFAULT '0',
  `order_shipped_date` date DEFAULT NULL,
  `order_tracking_number` varchar(50) DEFAULT NULL,
  `order_user_id` int(11) DEFAULT NULL,
  `order_shipping_method_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `orders`
--

INSERT INTO `orders` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_shipped_date`, `order_tracking_number`, `order_user_id`, `order_shipping_method_id`) VALUES
(1, '2019-12-29-00001', '2019-12-29 00:00:00.000546', 1, '1970-01-01', 'fsfdfdsdfdfsdf', 2, 0),
(2, '2020-01-02-00001', '2020-01-02 00:00:00.000546', 1, NULL, NULL, 2, 0),
(3, '2020-01-03-00001', '2020-01-02 00:00:00.000546', 1, '2020-01-13', 'ffgbgffgfgb', 2, 0),
(4, '2020-01-09-00001', '2020-01-09 00:00:00.000546', 2, NULL, NULL, 2, 0),
(5, '2019-02-29-00001', '2019-11-29 00:00:00.000546', 1, NULL, NULL, 2, 0),
(6, '2019-03-19-00001', '2019-11-29 00:00:00.000546', 2, NULL, NULL, 2, 0),
(133, '2020-01-24-00001', '2020-01-24 00:00:00.000000', 0, NULL, NULL, 5, 0),
(134, '2019-01-22-00001', '2019-01-22 00:00:00.000000', 2, '2019-01-25', 'AC009BF32', 6, 0),
(171, '2020-01-10-00001', '2020-01-10 00:00:00.000000', 2, NULL, NULL, 1, 0),
(172, '2020-01-10-00002', '2020-01-10 00:00:00.000000', 2, NULL, NULL, 8, 0),
(173, '2020-01-11-00001', '2020-01-11 00:00:00.000000', 2, NULL, NULL, 2, 0),
(174, '2020-01-12-00001', '2020-01-12 00:00:00.000000', 2, NULL, NULL, 5, 0),
(175, '2020-01-13-00001', '2020-01-13 00:00:00.000000', 2, NULL, NULL, 11, 0),
(176, '2020-01-15-00001', '2020-01-15 00:00:00.000000', 2, NULL, NULL, 4, 0),
(177, '2020-01-15-00002', '2020-01-15 00:00:00.000000', 2, NULL, NULL, 5, 0),
(178, '2020-01-17-00001', '2020-01-17 00:00:00.000000', 2, NULL, NULL, 5, 0),
(179, '2020-01-18-00001', '2020-01-18 00:00:00.000000', 2, NULL, NULL, 8, 0),
(180, '2020-01-18-00002', '2020-01-18 00:00:00.000000', 2, NULL, NULL, 2, 0),
(181, '2020-01-19-00001', '2020-01-19 00:00:00.000000', 2, NULL, NULL, 7, 0),
(182, '2020-01-20-00001', '2020-01-20 00:00:00.000000', 2, NULL, NULL, 3, 0),
(183, '2020-01-20-00002', '2020-01-20 00:00:00.000000', 2, NULL, NULL, 9, 0),
(184, '2020-01-26-00001', '2020-01-26 00:00:00.000000', 2, NULL, NULL, 5, 0),
(185, '2020-01-27-00001', '2020-01-27 00:00:00.000000', 2, NULL, NULL, 5, 0),
(186, '2020-01-27-00002', '2020-01-27 00:00:00.000000', 2, NULL, NULL, 9, 0),
(187, '2020-01-28-00001', '2020-01-28 00:00:00.000000', 2, NULL, NULL, 2, 0),
(188, '2020-01-28-00002', '2020-01-28 00:00:00.000000', 2, NULL, NULL, 7, 0),
(189, '2020-01-29-00001', '2020-01-29 00:00:00.000000', 2, NULL, NULL, 6, 0),
(190, '2020-01-29-00002', '2020-01-29 00:00:00.000000', 2, NULL, NULL, 6, 0),
(191, '2020-01-30-00001', '2020-01-30 00:00:00.000000', 1, NULL, NULL, 10, 0),
(192, '2020-01-30-00002', '2020-01-30 00:00:00.000000', 1, NULL, NULL, 1, 0),
(193, '2020-01-31-00001', '2020-01-31 00:00:00.000000', 1, NULL, NULL, 2, 0),
(194, '2020-02-01-00001', '2020-02-01 00:00:00.000000', 1, NULL, NULL, 1, 0),
(195, '2020-02-01-00002', '2020-02-01 00:00:00.000000', 1, NULL, NULL, 1, 0),
(196, '2020-02-01-00003', '2020-02-01 00:00:00.000000', 1, NULL, NULL, 2, 0),
(197, '2020-02-02-00001', '2020-02-02 00:00:00.000000', 1, NULL, NULL, 4, 0),
(198, '2020-02-02-00002', '2020-02-02 00:00:00.000000', 1, NULL, NULL, 11, 0),
(199, '2020-02-03-00001', '2020-02-03 00:00:00.000000', 2, NULL, NULL, 7, 0),
(200, '2020-02-03-00002', '2020-02-03 00:00:00.000000', 0, NULL, NULL, 5, 0),
(201, '2020-02-04-00001', '2020-02-04 00:00:00.000000', 0, NULL, NULL, 3, 0),
(202, '2020-02-04-00002', '2020-02-04 00:00:00.000000', 0, NULL, NULL, 4, 0),
(203, '2020-02-05-00001', '2020-02-05 00:00:00.000000', 0, NULL, NULL, 11, 0),
(204, '2020-02-05-00002', '2020-02-05 00:00:00.000000', 1, NULL, NULL, 10, 0),
(205, '2020-02-06-00001', '2020-02-06 00:00:00.000000', 0, NULL, NULL, 3, 0),
(206, '2020-02-06-00002', '2020-02-06 00:00:00.000000', 2, NULL, NULL, 6, 0),
(231, '2020-01-20-00003', '2020-01-20 00:00:00.000000', 2, NULL, NULL, 9, 0),
(232, '2020-01-21-00001', '2020-01-21 00:00:00.000000', 2, NULL, NULL, 5, 0),
(233, '2020-01-22-00001', '2020-01-22 00:00:00.000000', 2, NULL, NULL, 5, 0),
(234, '2020-01-22-00002', '2020-01-22 00:00:00.000000', 2, NULL, NULL, 9, 0),
(235, '2020-01-23-00001', '2020-01-23 00:00:00.000000', 2, NULL, NULL, 2, 0),
(236, '2020-01-23-00002', '2020-01-23 00:00:00.000000', 2, NULL, NULL, 7, 0),
(237, '2020-01-24-00005', '2020-01-24 00:00:00.000000', 2, NULL, NULL, 2, 0),
(238, '2020-01-24-00006', '2020-01-24 00:00:00.000000', 2, NULL, NULL, 5, 0),
(261, '2019-12-10-00001', '2019-12-10 00:00:00.000000', 2, NULL, NULL, 1, 0),
(262, '2019-12-10-00002', '2019-12-10 00:00:00.000000', 2, NULL, NULL, 8, 0),
(263, '2019-12-11-00001', '2019-12-11 00:00:00.000000', 2, NULL, NULL, 2, 0),
(264, '2019-12-12-00001', '2019-12-12 00:00:00.000000', 2, NULL, NULL, 5, 0),
(265, '2019-12-13-00001', '2019-12-13 00:00:00.000000', 2, NULL, NULL, 11, 0),
(266, '2019-12-15-00001', '2019-12-15 00:00:00.000000', 2, NULL, NULL, 4, 0),
(267, '2019-12-15-00002', '2019-12-15 00:00:00.000000', 2, NULL, NULL, 5, 0),
(268, '2019-12-17-00001', '2019-12-17 00:00:00.000000', 2, NULL, NULL, 5, 0),
(269, '2019-12-18-00001', '2019-12-18 00:00:00.000000', 2, NULL, NULL, 8, 0),
(270, '2019-12-18-00002', '2019-12-18 00:00:00.000000', 2, NULL, NULL, 2, 0),
(271, '2019-12-19-00001', '2019-12-19 00:00:00.000000', 2, NULL, NULL, 7, 0),
(272, '2019-12-20-00001', '2019-12-20 00:00:00.000000', 2, NULL, NULL, 3, 0),
(273, '2019-12-25-00003', '2019-12-20 00:00:00.000000', 2, NULL, NULL, 9, 0),
(274, '2019-12-26-00001', '2019-12-26 00:00:00.000000', 2, NULL, NULL, 5, 0),
(275, '2019-12-27-00001', '2019-12-27 00:00:00.000000', 2, NULL, NULL, 5, 0),
(276, '2019-12-27-00002', '2019-12-27 00:00:00.000000', 2, NULL, NULL, 9, 0),
(277, '2019-12-28-00001', '2019-12-28 00:00:00.000000', 2, NULL, NULL, 2, 0),
(278, '2019-12-28-00002', '2019-12-28 00:00:00.000000', 2, NULL, NULL, 7, 0),
(279, '2019-12-29-00008', '2019-12-29 00:00:00.000000', 2, NULL, NULL, 6, 0),
(280, '2019-12-29-00009', '2019-12-29 00:00:00.000000', 2, NULL, NULL, 6, 0),
(281, '2019-12-30-00001', '2019-12-30 00:00:00.000000', 1, NULL, NULL, 10, 0),
(282, '2019-12-30-00002', '2019-12-30 00:00:00.000000', 1, NULL, NULL, 1, 0),
(283, '2019-01-12-00002', '2019-01-12 00:00:00.000000', 2, NULL, NULL, 12, 0);

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_order_id` int(11) DEFAULT NULL,
  `order_item_product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `order_items`
--

INSERT INTO `order_items` (`order_item_order_id`, `order_item_product_id`) VALUES
(1, 11),
(1, 12),
(2, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(4, 19),
(4, 11),
(5, 14),
(5, 10),
(5, 22),
(5, 1),
(5, 8),
(6, 9),
(133, NULL),
(133, 8),
(133, 1),
(133, 15),
(133, 20),
(134, 8),
(134, 6),
(171, 8),
(171, 10),
(172, 15),
(172, 12),
(173, 8),
(174, 22),
(175, 5),
(176, 6),
(176, 5),
(177, 8),
(177, 8),
(178, 8),
(179, 9),
(180, 9),
(181, 10),
(182, 14),
(182, 10),
(183, 26),
(184, 9),
(185, 17),
(186, 17),
(187, 9),
(188, 8),
(188, 16),
(189, 14),
(189, 8),
(190, 11),
(190, 20),
(190, 20),
(191, 22),
(192, 9),
(192, 10),
(193, 10),
(193, 16),
(194, 16),
(195, 15),
(195, 8),
(196, 18),
(197, 18),
(198, 18),
(199, 15),
(200, 15),
(200, 15),
(201, 11),
(201, 16),
(200, 18),
(202, 11),
(202, 17),
(202, 14),
(203, 14),
(204, 16),
(205, 15),
(205, 18),
(206, 19),
(207, 18),
(208, 18),
(209, 18),
(209, 18),
(210, 16),
(210, 16),
(211, 16),
(211, 18),
(212, 18),
(212, 17),
(213, 19),
(213, 19),
(214, 16),
(214, 16),
(214, 12),
(215, 12),
(216, 11),
(217, 11),
(217, 12),
(218, 10),
(219, 10),
(219, 12),
(214, 9),
(214, 16),
(214, 16),
(215, 8),
(216, 8),
(217, 17),
(217, 17),
(218, 17),
(219, 15),
(219, 14),
(214, 17),
(214, 16),
(214, 17),
(215, 13),
(216, 13),
(217, 13),
(217, 15),
(218, 13),
(219, 14),
(219, 11),
(220, 12),
(221, 13),
(222, 16),
(223, 13),
(224, 17),
(224, 14),
(225, 17),
(226, 8),
(227, 9),
(227, 10),
(228, 18),
(228, 9),
(229, 10),
(230, 10),
(231, 8),
(232, 15),
(232, 14),
(233, 11),
(233, 8),
(234, 9),
(235, 17),
(236, 12),
(237, 10),
(237, 16),
(238, 19),
(238, 9),
(238, 22),
(239, 15),
(240, 14),
(241, 17),
(242, 16),
(243, 17),
(244, 13),
(245, 13),
(246, 13),
(247, 15),
(247, 13),
(248, 14),
(248, 11),
(248, 12),
(249, 13),
(249, 16),
(250, 13),
(250, 17),
(251, 14),
(252, 17),
(253, 8),
(253, 9),
(254, 10),
(255, 18),
(254, 9),
(256, 10),
(258, 10),
(257, 8),
(259, 15),
(260, 14),
(261, 11),
(261, 8),
(262, 9),
(262, 17),
(262, 12),
(263, 10),
(264, 16),
(264, 19),
(265, 9),
(266, 15),
(267, 14),
(267, 17),
(268, 16),
(268, 17),
(269, 13),
(269, 13),
(270, 13),
(271, 15),
(272, 13),
(273, 14),
(274, 11),
(275, 12),
(275, 13),
(276, 16),
(276, 13),
(277, 17),
(278, 14),
(278, 17),
(279, 8),
(280, 9),
(281, 10),
(281, 18),
(281, 9),
(282, 10),
(282, 10),
(282, 22),
(283, 10),
(283, 16);

-- --------------------------------------------------------

--
-- Structure de la table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_status_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `order_status_name`) VALUES
(0, 'En cours'),
(1, 'Expédiée'),
(2, 'Reçue');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_price` decimal(5,2) DEFAULT NULL,
  `product_description` varchar(1000) DEFAULT NULL,
  `product_custom` tinyint(1) NOT NULL DEFAULT '0',
  `product_collection_id` int(11) DEFAULT NULL,
  `product_category_id` int(11) DEFAULT NULL,
  `product_cover_image_id` int(11) DEFAULT NULL,
  `product_promo_id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_description`, `product_custom`, `product_collection_id`, `product_category_id`, `product_cover_image_id`, `product_promo_id`) VALUES
(1, 'Collier daisy', '29.00', 'Joli collier Daisy cherche Flower Child pour le porter fièrement…\n \nNos créations sont conçues et confectionnées avec amour dans notre atelier à Paris.\n\nNos matières premières viennent d’ U.E \n\nNous produisons nos bijoux à la commande et nous recyclons nos chutes.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\n\nMatière : acrylique brillant fabriqué en Espagne / jolie chaîne en laiton doré\n\nCouleur : Blanc / Jaune pastel\n\nTaille pendentif :  5 cm\n\nLongueur chaîne : 60 cm', 0, 4, 33, 94, 1),
(9, 'Boucles d’oreilles Storm', '29.00', '\nPour les fêtes de fin d’années on voulait réveiller la Disco Lady qui sommeille en toi ! Sublime la avec l’un de nos bijoux de la collection.\n\nLes boucles d’oreilles Storm légères et graphiques seront du plus bel effet pour les fêtes de fin d’année !\n\nAttention on te promet que tu ne passeras pas inaperçue avec elles !!! \n\nNos bijoux sont fabriqués avec amour dans notre atelier à Paris.\n\nNos matières premières viennent d’ U.E \n\nNous produisons nos bijoux à la commande et nous recyclons nos chutes.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé. \n\nMatière : acrylique brillant fabriqué en Espagne / attache en laiton sans nickel antiallergique\n\nCouleur : Doré miroir / Bleu électrique\n\nHauteur boucle  :  8 cm\n\nTaille pendentif : 8 cm / 2,5 cm\n\nÉpaisseur : 6 mm\n\nEntretien : Nous conseillons d’éviter le parfum sur les matières miroir', 0, 1, 28, 63, 1),
(10, 'Broche Calavera', '45.00', 'Broche Calavera, ces crânes colorés sont les emblèmes du jour des morts au Mexique.\n\nNos créations sont conçues et confectionnées avec amour dans notre atelier à Paris.\n\nNos matières premières viennent d’ U.E \n\nNous produisons nos bijoux à la commande et nous recyclons nos chutes.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\n\nMatière : acrylique brillant fabriqué en Espagne / broche en laiton argenté sans nickel\n\nCouleur : blanc / Rose / bleu / violet / vert\n\nTaille pendentif  :  6 cm / 5 cm\n\nLongueur broche : 3 cm\n\nÉpaisseur : 6 mm', 0, 2, 29, 64, 1),
(11, 'Bague Memphis 90’s', '25.00', 'Cette jolie bague réglable ultra graphique sera du plus bel effet pour parfaire ton look 90’s !\n\nQuelle sera ta couleur préférée? Noir, Mint ou les deux ?\n\nNos créations sont conçues et confectionnées avec amour dans notre atelier à Paris.\n\nNos matières premières viennent d’ U.E\n\nNous produisons nos bijoux à la commande et nous recyclons nos chutes.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\n\nMatière : acrylique brillant fabriqué en Espagne / anneau réglable en laiton doré sans nickel\n\nCouleur : Mint, Jaune, Rose  / Noir, Blanc, Rose\n\nTaille pendentif : 3 cm de diamètre\n\nÉpaisseur : 6 mm ', 1, 3, 35, 67, 1),
(12, 'Boucles d’oreilles Lips', '29.00', 'La collection Woman est un hommage à l’amour de la femme ainsi qu’à l’amour entre femmes et quelle fierté d’avoir pour égéries les Nanas d’paname le collectif de femmes inspirantes, portes parole de la collection.\n\nOn adore ces boucles Lips au look graphique et minimaliste.\n\n Nos créations sont conçues et confectionnées avec amour dans notre atelier à Paris.\n\nNos matières premières viennent d’Espagne, d’Italie et du Royaume Uni.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.', 0, 5, 36, 68, 1),
(13, 'Bague Ellipse Noir, Ivoire ou Doré', '15.00', 'Craquez pour la bague Elipse régliable, graphique et originale, pour un look ultra sophistiqué !\n\nMade in France Garanti ! Nos créations sont conçues et confectionnées avec amour dans notre atelier à Paris .\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\n\nMatière : acrylique fabriqué en Espagne / anneau réglable en laiton doré\nCouleur :  Doré /  Noir  / Ivoire\n\nTaille pendentifs : 3 cm', 0, 6, 36, 69, 1),
(14, 'Broche Teddy Bear', '35.00', 'On craque pour cette adorable broche Teddy Bear câlin à souhait !\n\nMade in France Garanti ! Nos créations sont conçues et confectionnées avec amour, artisanalement, dans notre atelier à Paris .\n\nNos matières premières viennent d’Espagne, d’Italie et du Royaume Uni.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\n\nMatière : acrylique opaque satiné fabriqué en Espagne\nCouleur : doré / ivoire / rose \nTaille pendentif : 5 cm / 4,5 cm\nLongueur Broche : 3 cm', 0, 7, 29, 70, 1),
(15, 'Collier Hippocampe', '30.00', 'Série Limitée!\n\nCet été Jule et Lily vous plonge sous l’océan! On craque pour cet adorable collier des hippocampes amoureux!\n\nNos créations sont conçues et confectionnées avec amour, artisanalement, dans notre atelier à Paris .\n\nMade in France Garanti !\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé', 0, 8, 33, 71, 1),
(16, 'Boucles d’oreilles Loup Doré', '25.00', 'On craque pour ces boucles d’oreilles Loup en doré miroir ! Parfait pour un look graphique et girly…\n\nNos créations sont conçues et confectionnées avec amour, artisanalement, dans notre atelier à Paris .\n\nMade in France Garanti !\nNos bijoux sont livrés dans une jolie boîte éditée en série limitée.\n\nMatière : acrylique miroir fabriqué en Espagne\nCouleur : Doré\nTaille pendentif : 4 cm / 3 cm\nAttaches dormeuses : dorées en alu sans nickel (anti-allergique)\n\nPs : Évitez l’alcool avec l’acrylique miroir, pensez à vous parfumer avant de mettre vos boucles.', 0, 9, 28, 72, 1),
(17, 'Broche Extra Terrestre', '35.00', '\nOn adore la broche Extra Terrestre, en acrylique doré et son coeur en miroir rose. Parfait pour un look fun et girly \n\nNos créations, sont conçues et confectionnées avec amour, artisanalement, dans notre atelier à Paris .\nMade in France Garanti !\n\nNos bijoux sont livrés dans une jolie boîte éditée en série limitée.', 0, 10, 29, 73, 1),
(21, 'Boucles d’oreilles  » Gipsy Cat  » Blanc', '29.00', 'Boucles d’oreilles  » Gispy Cat  » Blanc, en acrylique finition brillante, découpé au laser, monté sur des supports en laiton argenté.\n\nNos bijoux sont conçus et confectionnés par nos soins, de manière artisanale, dans notre atelier.\n\nTous nos bijoux sont livrés dans une jolie boîte en kraft recyclé, que nous imprimons en sérigraphie.\n\nMatière : Acrylique d’Italie / support en laiton argenté\nCouleur : Blanc / Doré\nHauteur Boucle : 5,5 cm\nTaille Pendentif : 4 cm / 4 cm\nDétail : Logo gravé au dos\ndescription du produit', 0, 13, 28, 77, 1),
(22, 'Petit Collier Crabe rouge', '19.00', 'Petit Collier Crabe rouge en acrylique, pendentif découpé au laser, monté sur une fine chaîne en laiton doré\n\nCréation Made in France\n', 0, 14, 33, 78, 1),
(24, 'Broche Pomme d’Amour', '25.00', '\n\nOn craque pour cette jolie broche Pomme d’Amour gourmande à souhait !\n\nMade in France Garanti ! Nos créations sont conçues et confectionnées avec amour, artisanalement, dans notre atelier à Paris .\n\nNos matières premières viennent d’Espagne, d’Italie et du Royaume Uni.\n\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé afin de les protéger et de les conserver.\n\nMatière : acrylique opaque satiné fabriqué en Espagne \nCouleur : doré / rose miroir \nTaille pendentif : 4 cm / 3 cm\nLongueur Broche : 2,5 cm\n', 1, 7, 29, 101, 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `promo_name` varchar(150) DEFAULT NULL,
  `promo_value` int(11) DEFAULT NULL,
  `promo_is_active` tinyint(1) DEFAULT NULL,
  `promo_sticker_color` varchar(80) DEFAULT NULL,
  `promo_sticker_text` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `promo`
--

INSERT INTO `promo` (`promo_id`, `promo_name`, `promo_value`, `promo_is_active`, `promo_sticker_color`, `promo_sticker_text`) VALUES
(1, 'Prix Normal', 0, 1, 'NULL', 'NULL'),
(2, 'Noel', 25, 0, '#af7474', 'NOEL'),
(3, 'Hiver 2019-2020', 40, NULL, '#0d9be3', '40%'),
(4, 'je suis une promo', 55, NULL, '#350dff', 'hehe');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `role_id` tinyint(1) NOT NULL DEFAULT '1',
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(0, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `shipping_id` int(11) NOT NULL,
  `shipping_type` varchar(50) DEFAULT NULL,
  `shipping_price` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `shipping_methods`
--

INSERT INTO `shipping_methods` (`shipping_id`, `shipping_type`, `shipping_price`) VALUES
(0, 'France', '3.50'),
(1, 'Europe', '6.50'),
(2, 'International', '12.50');

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL,
  `stock_quantity` int(3) NOT NULL,
  `stock_min` int(2) NOT NULL,
  `stock_product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `stock`
--

INSERT INTO `stock` (`stock_id`, `stock_quantity`, `stock_min`, `stock_product_id`) VALUES
(3, 18, 5, 1),
(4, 123, 8, 2),
(8, 19, 2, 3),
(11, 12, 12, 7),
(12, 8, 5, 8),
(13, 1, 2, 9),
(14, 15, 2, 10),
(15, 6, 5, 11),
(18, 4, 5, 12),
(19, 13, 10, 13),
(20, 9, 5, 14),
(21, 10, 10, 15),
(22, 16, 4, 16),
(24, 6, 3, 17),
(25, 6, 5, 18),
(26, 2, 2, 19),
(27, 8, 2, 20),
(28, 12, 4, 21),
(29, 14, 6, 22),
(30, 2, 5, 23),
(32, 2, 2, 24);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_firstname` varchar(50) DEFAULT NULL,
  `user_lastname` varchar(50) DEFAULT NULL,
  `user_email` varchar(120) DEFAULT NULL,
  `user_password` varchar(500) DEFAULT NULL,
  `user_role` tinyint(1) DEFAULT '0',
  `user_login` varchar(60) DEFAULT NULL,
  `user_date_of_birth` date DEFAULT NULL,
  `user_phone` int(100) DEFAULT NULL,
  `user_email_verified` tinyint(1) DEFAULT NULL,
  `user_registration_date` datetime(6) DEFAULT NULL,
  `user_company_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`user_id`, `user_firstname`, `user_lastname`, `user_email`, `user_password`, `user_role`, `user_login`, `user_date_of_birth`, `user_phone`, `user_email_verified`, `user_registration_date`, `user_company_name`) VALUES
(1, 'lily', 'lily', 'lili@juleetlily.fr', '$2b$10$dEzO2wYNpNP0lqdPVbMCKOuXmHWEl5X5lEUM8A3iMMumMuKlwcLYS', 0, 'lily', '1991-11-22', 637124403, 1, '2019-11-28 00:00:00.000000', 'jule et lily'),
(2, 'louis', 'cascio', 'casciolouis@gmail.com', 'juleetlili', 1, 'louis', '1991-11-22', 637124402, 1, '2019-11-28 00:00:00.000000', 'perso'),
(5, 'Carrie', 'Dent', 'cd@gmail.com', 'cd', 1, 'cd', '2020-01-01', 600000000, NULL, '2019-11-28 00:00:00.000000', 'Cabinet Dentaire C.DENT'),
(6, 'Eddy', 'Malou', 'eddymalou@gmail.com', 'ef', 1, 'ef', '2020-01-01', 600000000, NULL, '2019-11-28 00:00:00.000000', 'ef'),
(7, 'George', 'Harrisson', 'gh@gmail.com', 'gh', 1, 'ef', '2020-01-01', 600000000, NULL, '2020-01-01 00:00:00.000000', 'ef'),
(8, 'Igor', 'Jojo', 'ij@gmail.com', 'ij', 1, 'ij', '2020-01-16', 600000000, NULL, '2020-01-02 00:00:00.000000', 'ij'),
(9, 'karine', 'Lemarchand', 'kl@gmail.com', 'kl', 1, 'kl', '2020-01-10', 600000000, NULL, '2020-01-16 00:00:00.000000', 'kl'),
(11, 'Ophélie', 'Poulet', 'op@gmail.com', 'mn', 1, 'op', '2020-01-09', 600000000, NULL, '2020-01-30 00:00:00.000000', 'op');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `address_user_id` (`address_user_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Index pour la table `code_promo`
--
ALTER TABLE `code_promo`
  ADD PRIMARY KEY (`code_promo_id`);

--
-- Index pour la table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collection_id`),
  ADD KEY `collection_image_id` (`collection_cover_image_id`);

--
-- Index pour la table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  ADD PRIMARY KEY (`collection_menu_id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `image_collection_id` (`image_collection_id`),
  ADD KEY `image_product_id` (`image_product_id`);

--
-- Index pour la table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoice_order_id` (`invoice_order_id`),
  ADD KEY `invoice_promo_code_id` (`invoice_promo_code_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_ref` (`order_ref`),
  ADD KEY `order_status` (`order_status`),
  ADD KEY `order_user_id` (`order_user_id`),
  ADD KEY `order_shipping_method_id` (`order_shipping_method_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD KEY `order_item_order_ref` (`order_item_order_id`),
  ADD KEY `order_item_product_id` (`order_item_product_id`);

--
-- Index pour la table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_collection_id` (`product_collection_id`),
  ADD KEY `product_category_id` (`product_category_id`),
  ADD KEY `product_image_id` (`product_cover_image_id`),
  ADD KEY `product_promo_id` (`product_promo_id`);

--
-- Index pour la table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`) USING BTREE;

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Index pour la table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`shipping_id`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`),
  ADD UNIQUE KEY `stock_product_id` (`stock_product_id`) USING BTREE;

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role` (`user_role`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT pour la table `code_promo`
--
ALTER TABLE `code_promo`
  MODIFY `code_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `collection`
--
ALTER TABLE `collection`
  MODIFY `collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT pour la table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  MODIFY `collection_menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT pour la table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=284;
--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`address_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`collection_cover_image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`image_collection_id`) REFERENCES `collection` (`collection_id`),
  ADD CONSTRAINT `image_ibfk_2` FOREIGN KEY (`image_product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_collection_id`) REFERENCES `collection` (`collection_id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_cover_image_id`) REFERENCES `image` (`image_id`),
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`product_promo_id`) REFERENCES `promo` (`promo_id`);

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`stock_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_role`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
