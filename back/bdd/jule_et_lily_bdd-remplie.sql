-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  ven. 13 déc. 2019 à 11:08
-- Version du serveur :  8.0.18-0ubuntu0.19.10.1
-- Version de PHP :  7.2.25-1+ubuntu19.10.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `jule_et_lily_bdd`
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
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`address_id`, `address_firstname`, `address_lastname`, `address_street`, `address_city`, `address_country`, `address_zip_code`, `address_company_name`, `is_shipping_address`, `is_billing_address`, `address_user_id`) VALUES
(1, 'Louis', 'Cascio', '12 rue de la banane', 'Paris', 'France', '75000', 'wildcodeschool', 1, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Accessoires cheveux'),
(2, 'Bonnet'),
(3, 'Halloween'),
(4, 'Collier'),
(5, 'Boucles d\'oreilles'),
(6, 'Broche'),
(7, 'Bague'),
(8, 'Pin\'s'),
(9, 'Minimal'),
(10, '80\'s'),
(11, '90\'s'),
(12, 'Bijou'),
(13, 'Bijou personnalisable');

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
-- Déchargement des données de la table `code_promo`
--

INSERT INTO `code_promo` (`code_promo_id`, `code_promo_name`, `code_promo_value`, `code_promo_date_start`, `code_promo_date_end`) VALUES
(1, 'Mega code_promo', 90, '2019-12-10', '2019-12-31');

-- --------------------------------------------------------

--
-- Structure de la table `collection`
--

CREATE TABLE `collection` (
  `collection_id` int(11) NOT NULL,
  `collection_name` varchar(50) NOT NULL,
  `collection_cover_image_url` varchar(500) DEFAULT NULL,
  `collection_image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `collection`
--

INSERT INTO `collection` (`collection_id`, `collection_name`, `collection_cover_image_url`, `collection_image_id`) VALUES
(1, 'DISCO LADY', NULL, 1),
(2, 'DIA DE LOS MUERTOS', NULL, 1),
(3, '90\'S', NULL, 1),
(4, 'FLOWER POWER', NULL, 1),
(5, 'WOMAN', NULL, 1),
(6, 'MINIMAL', NULL, 1),
(7, 'FÊTE FORAINE', NULL, 1),
(8, 'UNDER THE OCEAN', NULL, 1),
(9, 'GRAND CANYON', NULL, 1),
(10, 'COSMIC', NULL, 1),
(11, 'HAPPY DAYS', NULL, 1),
(12, '80\'S FRESH', NULL, 1),
(13, 'GIPSY QUEEN', NULL, 1),
(14, 'POP MY BEACH', NULL, 1);

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
-- Déchargement des données de la table `header_collection_menu`
--

INSERT INTO `header_collection_menu` (`collection_menu_id`, `collection_menu_background_color`, `collection_menu_title`, `collection_menu_url`, `collection_menu_title_color`) VALUES
(1, 'pink', 'DIA DE LOS MUERTOS', 'https://juleetlily.com/collection-dia-de-los-muertos/', 'orange'),
(2, 'yellow', '90\'S', 'https://juleetlily.com/collection-90s/', 'yellow'),
(3, 'purple', 'FLOWER POWER', 'https://juleetlily.com/collection-flower-power/', 'grey'),
(5, 'kiki', '1', 'https://juleetlily.com/wp-content/uploads/2019/11/Disco-Lady-02-05.jpg', 'ssdsds'),
(7, 'red', 'giver', 'https://juleetlily.com/collection-dia-de-los-muertos/', 'orange'),
(8, 'green', 'zimbabwenite', 'https://juleetlily.com/collection-dia-de-los-muertos/', 'pipip'),
(10, 'ghghededede', 'scqsqsxsq', 'https://juleetlily.com/collection-dia-de-los-muertos/', 'green');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL,
  `image_name` varchar(50) DEFAULT NULL,
  `is_slider_image` tinyint(1) DEFAULT '0',
  `image_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`image_id`, `image_name`, `is_slider_image`, `image_url`) VALUES
(1, '	\r\nJenny', 0, 'https://juleetlily.com/wp-content/uploads/2019/11/Disco-Lady-02-05.jpg'),
(3, '        \r\nslider__custom', 1, 'https://juleetlily.com/wp-content/uploads/2019/01/Fond-final.gif'),
(6, 'lalalala', 1, 'https://juleetlily.com/wp-content/uploads/2019/11/Disco-Lady-02-05.jpg'),
(7, 'keketssqdqdqsdqsdqs', 0, 'https://juleetlily.com/collection-dia-de-los-muertos/'),
(8, 'keketssqdqdqsdqsdqs', 0, 'https://juleetlily.com/collection-dia-de-los-muertos/');

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
-- Déchargement des données de la table `invoice`
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
  `order_shipped_date` datetime DEFAULT NULL,
  `order_tracking_number` varchar(50) DEFAULT NULL,
  `order_user_id` int(11) DEFAULT NULL,
  `order_shipping_method_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_shipped_date`, `order_tracking_number`, `order_user_id`, `order_shipping_method_id`) VALUES
(1, '2019-11-29-00001', '2019-11-29 00:00:00.000546', 0, NULL, NULL, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_order_id` int(11) DEFAULT NULL,
  `order_item_product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`order_item_order_id`, `order_item_product_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_status_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `order_status`
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
  `product_collection_id` int(11) DEFAULT '0',
  `product_category_id` int(11) DEFAULT '0',
  `product_image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_description`, `product_custom`, `product_collection_id`, `product_category_id`, `product_image_id`) VALUES
(1, 'Boucles d’oreilles Storm', '29.00', '\r\n\r\nPour les fêtes de fin d’années on voulait réveiller la Disco Lady qui sommeille en toi ! Sublime la avec l’un de nos bijoux de la collection.\r\n\r\nLes boucles d’oreilles Storm légères et graphiques seront du plus bel effet pour les fêtes de fin d’année !\r\n\r\nAttention on te promet que tu ne passeras pas inaperçue avec elles !!! \r\n\r\n \r\n\r\nNos créations sont conçues et confectionnées avec amour dans notre atelier à Paris.\r\n\r\nNos matières premières viennent d’ U.E \r\n\r\nNous produisons nos bijoux à la commande et nous recyclons nos chutes.\r\n\r\nNos bijoux sont livrés dans une jolie boîte colorée en carton recyclé.\r\n\r\n \r\n\r\nMatière : acrylique brillant fabriqué en Espagne / attache en laiton sans nickel antiallergique\r\n\r\nCouleur : Doré miroir / Bleu électrique\r\n\r\nHauteur boucle  :  8 cm\r\n\r\nTaille pendentif : 8 cm / 2,5 cm\r\n\r\nÉpaisseur : 6 mm\r\n\r\nEntretien : Nous conseillons d’éviter le parfum sur les matières miroir\r\n', 0, 1, 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `promo_name` varchar(150) DEFAULT NULL,
  `promo_value` int(11) DEFAULT NULL,
  `promo_is_active` tinyint(1) DEFAULT NULL,
  `promo_sticker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo`
--

INSERT INTO `promo` (`promo_id`, `promo_name`, `promo_value`, `promo_is_active`, `promo_sticker_id`) VALUES
(1, 'christmas', 25, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo_items`
--

CREATE TABLE `promo_items` (
  `promo_items_promo_id` int(11) DEFAULT NULL,
  `promo_items_product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo_items`
--

INSERT INTO `promo_items` (`promo_items_promo_id`, `promo_items_product_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo_sticker`
--

CREATE TABLE `promo_sticker` (
  `sticker_id` int(11) NOT NULL,
  `sticker_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo_sticker`
--

INSERT INTO `promo_sticker` (`sticker_id`, `sticker_url`) VALUES
(1, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi17_2uoJzmAhX7DWMBHQZPDDIQjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Fgaetan_21&psig=AOvVaw2-4bpttBQnP4b8rGbURarl&ust=1575557810234264');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `role_id` tinyint(1) NOT NULL DEFAULT '1',
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
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
-- Déchargement des données de la table `shipping_methods`
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
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`stock_id`, `stock_quantity`, `stock_min`, `stock_product_id`) VALUES
(2, 123, 5, 1);

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
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `user_firstname`, `user_lastname`, `user_email`, `user_password`, `user_role`, `user_login`, `user_date_of_birth`, `user_phone`, `user_email_verified`, `user_registration_date`, `user_company_name`) VALUES
(1, 'lily', 'lily', 'lili@juleetlily.fr', 'juleetlily', 0, 'lily', '1991-11-22', 637124403, 1, '2019-11-28 00:00:00.000000', 'jule et lily'),
(2, 'louis', 'cascio', 'casciolouis@gmail.com', 'juleetlili', 1, 'louis', '1991-11-22', 637124402, 1, '2019-11-28 00:00:00.000000', 'perso');

--
-- Index pour les tables déchargées
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
  ADD KEY `collection_image_id` (`collection_image_id`);

--
-- Index pour la table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  ADD PRIMARY KEY (`collection_menu_id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`);

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
  ADD KEY `product_image_id` (`product_image_id`);

--
-- Index pour la table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`),
  ADD KEY `promo_sticker_id` (`promo_sticker_id`);

--
-- Index pour la table `promo_items`
--
ALTER TABLE `promo_items`
  ADD KEY `promo_items_promo_id` (`promo_items_promo_id`),
  ADD KEY `promo_items_product_id` (`promo_items_product_id`);

--
-- Index pour la table `promo_sticker`
--
ALTER TABLE `promo_sticker`
  ADD PRIMARY KEY (`sticker_id`);

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
  ADD KEY `stock_product_id` (`stock_product_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role` (`user_role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `code_promo`
--
ALTER TABLE `code_promo`
  MODIFY `code_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `collection`
--
ALTER TABLE `collection`
  MODIFY `collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  MODIFY `collection_menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `promo_sticker`
--
ALTER TABLE `promo_sticker`
  MODIFY `sticker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
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
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`collection_image_id`) REFERENCES `image` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`invoice_order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`invoice_promo_code_id`) REFERENCES `code_promo` (`code_promo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`order_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`order_status`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`order_shipping_method_id`) REFERENCES `shipping_methods` (`shipping_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_item_order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`order_item_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_collection_id`) REFERENCES `collection` (`collection_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_image_id`) REFERENCES `image` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `promo`
--
ALTER TABLE `promo`
  ADD CONSTRAINT `promo_ibfk_1` FOREIGN KEY (`promo_sticker_id`) REFERENCES `promo_sticker` (`sticker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `promo_items`
--
ALTER TABLE `promo_items`
  ADD CONSTRAINT `promo_items_ibfk_1` FOREIGN KEY (`promo_items_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promo_items_ibfk_2` FOREIGN KEY (`promo_items_promo_id`) REFERENCES `promo` (`promo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`stock_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_role`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
