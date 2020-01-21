-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 21, 2020 at 02:43 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `juleetlily_remplie`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
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
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `address_firstname`, `address_lastname`, `address_street`, `address_city`, `address_country`, `address_zip_code`, `address_company_name`, `is_shipping_address`, `is_billing_address`, `address_user_id`) VALUES
(1, 'Louis', 'Cascio', '12 rue de la banane', 'Paris', 'France', '75000', 'wildcodeschool', 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Accessoires cheveux'),
(3, 'Halloween'),
(8, 'Pin\'s'),
(9, 'Minimal'),
(10, '80\'s'),
(11, '90\'s'),
(13, 'Bijou personnalisable'),
(19, 'Sac'),
(26, 'Banane'),
(27, 'Décoration murale'),
(28, 'Boucles d\'oreilles'),
(29, 'Broche'),
(30, 'Bijou');

-- --------------------------------------------------------

--
-- Table structure for table `code_promo`
--

CREATE TABLE `code_promo` (
  `code_promo_id` int(11) NOT NULL,
  `code_promo_name` varchar(50) DEFAULT NULL,
  `code_promo_value` int(11) DEFAULT NULL,
  `code_promo_date_start` date DEFAULT NULL,
  `code_promo_date_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `code_promo`
--

INSERT INTO `code_promo` (`code_promo_id`, `code_promo_name`, `code_promo_value`, `code_promo_date_start`, `code_promo_date_end`) VALUES
(1, 'Mega code_promo', 90, '2019-12-10', '2019-12-31'),
(2, 'Super code_promo', 70, '2019-12-10', '2019-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `collection_id` int(11) NOT NULL,
  `collection_name` varchar(50) NOT NULL,
  `collection_cover_image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`collection_id`, `collection_name`, `collection_cover_image_id`) VALUES
(1, 'DISCO LADY', NULL),
(2, 'DIA DE LOS MUERTOS', NULL),
(3, '90\'S', NULL),
(4, 'FLOWER POWER', NULL),
(5, 'WOMAN', NULL),
(6, 'MINIMAL', NULL),
(7, 'FÊTE FORAINE', NULL),
(8, 'UNDER THE OCEAN', NULL),
(9, 'GRAND CANYON', NULL),
(10, 'COSMIC', NULL),
(11, 'HAPPY DAYS', NULL),
(12, '80\'S FRESH', NULL),
(13, 'GIPSY QUEEN', NULL),
(14, 'POP MY BEACH', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `header_collection_menu`
--

CREATE TABLE `header_collection_menu` (
  `collection_menu_id` int(11) NOT NULL,
  `collection_menu_background_color` varchar(15) DEFAULT NULL,
  `collection_menu_title` varchar(50) DEFAULT NULL,
  `collection_menu_url` varchar(500) DEFAULT NULL,
  `collection_menu_title_color` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `header_collection_menu`
--

INSERT INTO `header_collection_menu` (`collection_menu_id`, `collection_menu_background_color`, `collection_menu_title`, `collection_menu_url`, `collection_menu_title_color`) VALUES
(1, 'pink', 'DIA DE LOS MUERTOS', 'https://juleetlily.com/collection-dia-de-los-muertos/', 'orange'),
(2, 'yellow', '90\'S', 'https://juleetlily.com/collection-90s/', '#313119'),
(3, 'purple', 'FLOWER POWER', 'https://juleetlily.com/collection-flower-power/', 'grey');

-- --------------------------------------------------------

--
-- Table structure for table `image`
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
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `image_name`, `is_slider_image`, `image_url`, `image_product_id`, `image_collection_id`) VALUES
(1, 'Jenny', 0, 'https://juleetlily.com/wp-content/uploads/2019/11/Disco-Lady-02-05.jpg', NULL, 1),
(2, 'public/1579615187diapo-ice-queen-2.jpg', 1, 'test', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
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
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_ref`, `invoice_date`, `invoice_order_id`, `invoice_promo_code_id`, `invoice_tva`) VALUES
(1, '2019-29-11-INVOICE-00001', '2019-11-30 00:00:00.000671', 1, 1, '20.00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
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
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_shipped_date`, `order_tracking_number`, `order_user_id`, `order_shipping_method_id`) VALUES
(1, '2019-12-29-00001', '2019-12-29 00:00:00.000546', 1, NULL, NULL, 2, 0),
(2, '2020-01-02-00001', '2020-01-02 00:00:00.000546', 1, NULL, NULL, 2, 0),
(3, '2020-01-03-00001', '2020-01-02 00:00:00.000546', 0, NULL, NULL, 2, 0),
(4, '2020-01-09-00001', '2020-01-09 00:00:00.000546', 2, NULL, NULL, 2, 0),
(5, '2019-02-29-00001', '2019-11-29 00:00:00.000546', 1, NULL, NULL, 2, 0),
(6, '2019-03-19-00001', '2019-11-29 00:00:00.000546', 2, NULL, NULL, 2, 0),
(8, '2020-01-12-00001', '2020-01-12 00:00:00.000546', 2, NULL, NULL, 2, 0),
(9, '2019-01-12-00001', '2019-01-12 00:00:00.000546', 2, NULL, NULL, 2, 0),
(10, '2019-01-20-00002', '2019-01-12 00:00:00.000546', 2, NULL, NULL, 2, 0),
(11, '2019-12-12-00001', '2019-12-12 00:00:00.000546', 2, NULL, NULL, 2, 0),
(12, '2019-10-02-00001', '2019-10-02 00:00:00.000546', 2, NULL, NULL, 2, 0),
(13, '2019-10-02-00041', '2019-10-02 00:00:00.000546', 2, NULL, NULL, 2, 0),
(14, '2019-10-03-00001', '2019-10-03 00:00:00.000546', 2, NULL, NULL, 2, 0),
(15, '2019-09-22-00001', '2019-09-22 00:00:00.000546', 2, NULL, NULL, 2, 0),
(16, '2019-12-09-00001', '2019-12-09 00:00:00.000546', 2, NULL, NULL, 2, 0),
(17, '2019-11-23-00001', '2019-11-23 00:00:00.000546', 2, NULL, NULL, 2, 0),
(18, '2019-02-02-00001', '2019-02-02 00:00:00.000546', 2, NULL, NULL, 2, 0),
(19, '2019-02-15-00001', '2019-02-15 00:00:00.000546', 2, NULL, NULL, 2, 0),
(20, '2019-07-10-00001', '2019-07-10 00:00:00.000546', 2, NULL, NULL, 2, 0),
(21, '2019-04-10-00001', '2019-04-10 00:00:00.000546', 2, NULL, NULL, 2, 0),
(22, '2019-06-22-00001', '2019-06-22 00:00:00.000546', 2, NULL, NULL, 2, 0),
(23, '2019-08-02-00001', '2019-08-02 00:00:00.000546', 2, NULL, NULL, 2, 0),
(24, '2019-09-17-00001', '2019-09-17 00:00:00.000546', 2, NULL, NULL, 2, 0),
(25, '2019-09-05-00001', '2019-09-05 00:00:00.000546', 2, NULL, NULL, 2, 0),
(26, '2019-07-20-00001', '2019-07-20 00:00:00.000546', 2, NULL, NULL, 2, 0),
(127, '2019-02-28-00001', '2019-02-28 00:00:00.000546', 2, NULL, NULL, 2, 0),
(128, '2019-03-12-00001', '2019-03-12 00:00:00.000546', 2, NULL, NULL, 2, 0),
(129, '2019-03-22-00001', '2019-03-22 00:00:00.000546', 2, NULL, NULL, 2, 0),
(130, '2019-10-04-00001', '2019-10-04 00:00:00.000546', 2, NULL, NULL, 2, 0),
(131, '2019-05-14-00001', '2019-05-14 00:00:00.000546', 2, NULL, NULL, 2, 0),
(132, '2019-08-25-00001', '2019-08-25 00:00:00.000546', 2, NULL, NULL, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_order_id` int(11) DEFAULT NULL,
  `order_item_product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_order_id`, `order_item_product_id`) VALUES
(1, 1),
(2, 2),
(3, 4),
(1, 2),
(4, 2),
(5, 2),
(6, 1),
(8, 4),
(9, 2),
(9, 1),
(10, 3),
(10, 1),
(11, 1),
(11, 2),
(12, 2),
(12, 2),
(12, 2),
(12, 2),
(13, 2),
(14, 4),
(15, 1),
(16, 3),
(16, 4),
(17, 1),
(17, 2),
(18, 2),
(19, 1),
(19, 2),
(20, 2),
(21, 1),
(21, 4),
(22, 2),
(22, 2),
(23, 3),
(23, 4),
(24, 1),
(24, 2),
(25, 3),
(25, 2),
(26, 1),
(26, 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_status_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `order_status_name`) VALUES
(0, 'En cours'),
(1, 'Expédiée'),
(2, 'Reçue');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_price` decimal(5,2) DEFAULT NULL,
  `product_description` varchar(1000) DEFAULT NULL,
  `product_custom` tinyint(1) NOT NULL DEFAULT '0',
  `product_collection_id` int(11) DEFAULT NULL,
  `product_category_id` int(11) DEFAULT NULL,
  `product_cover_image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_description`, `product_custom`, `product_collection_id`, `product_category_id`, `product_cover_image_id`) VALUES
(1, 'Collier daisy', '32.00', 'super collier!', 0, 2, 1, NULL),
(2, 'un truc trop cher', '100.00', 'attention au portefeuille', 0, 10, 26, NULL),
(3, 'produit surprise', '25.40', NULL, 0, 3, 13, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promo`
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
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`promo_id`, `promo_name`, `promo_value`, `promo_is_active`, `promo_sticker_color`, `promo_sticker_text`) VALUES
(1, 'Prix Normal', 0, 1, 'NULL', 'NULL'),
(2, 'Noel', 25, 0, '#8900c9', 'PROMO');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` tinyint(1) NOT NULL DEFAULT '1',
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(0, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `shipping_id` int(11) NOT NULL,
  `shipping_type` varchar(50) DEFAULT NULL,
  `shipping_price` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`shipping_id`, `shipping_type`, `shipping_price`) VALUES
(0, 'France', '3.50'),
(1, 'Europe', '6.50'),
(2, 'International', '12.50');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL,
  `stock_quantity` int(3) NOT NULL,
  `stock_min` int(2) NOT NULL,
  `stock_product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `stock_quantity`, `stock_min`, `stock_product_id`) VALUES
(3, 18, 5, 1),
(4, 123, 8, 2),
(8, 12, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
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
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_firstname`, `user_lastname`, `user_email`, `user_password`, `user_role`, `user_login`, `user_date_of_birth`, `user_phone`, `user_email_verified`, `user_registration_date`, `user_company_name`) VALUES
(1, 'lily', 'lily', 'lili@juleetlily.fr', 'juleetlily', 0, 'lily', '1991-11-22', 637124403, 1, '2019-11-28 00:00:00.000000', 'jule et lily'),
(2, 'louis', 'cascio', 'casciolouis@gmail.com', 'juleetlili', 1, 'louis', '1991-11-22', 637124402, 1, '2019-11-28 00:00:00.000000', 'perso');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `address_user_id` (`address_user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `code_promo`
--
ALTER TABLE `code_promo`
  ADD PRIMARY KEY (`code_promo_id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collection_id`),
  ADD KEY `collection_image_id` (`collection_cover_image_id`);

--
-- Indexes for table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  ADD PRIMARY KEY (`collection_menu_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `image_collection_id` (`image_collection_id`),
  ADD KEY `image_product_id` (`image_product_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoice_order_id` (`invoice_order_id`),
  ADD KEY `invoice_promo_code_id` (`invoice_promo_code_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_ref` (`order_ref`),
  ADD KEY `order_status` (`order_status`),
  ADD KEY `order_user_id` (`order_user_id`),
  ADD KEY `order_shipping_method_id` (`order_shipping_method_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD KEY `order_item_order_ref` (`order_item_order_id`),
  ADD KEY `order_item_product_id` (`order_item_product_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_collection_id` (`product_collection_id`),
  ADD KEY `product_category_id` (`product_category_id`),
  ADD KEY `product_image_id` (`product_cover_image_id`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`shipping_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`),
  ADD UNIQUE KEY `stock_product_id` (`stock_product_id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role` (`user_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `code_promo`
--
ALTER TABLE `code_promo`
  MODIFY `code_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `header_collection_menu`
--
ALTER TABLE `header_collection_menu`
  MODIFY `collection_menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`address_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`collection_cover_image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`image_collection_id`) REFERENCES `collection` (`collection_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `image_ibfk_2` FOREIGN KEY (`image_product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_collection_id`) REFERENCES `collection` (`collection_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_cover_image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`stock_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_role`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;


--
-- Order to insert data into tables
--  Category
--  Code promo
--  Promo
--  Collection
--  Role
--  User
--  Shipping Methods
--  Adress
--  Header-collection
--  Order-status
--  Product (avec cover_image_à NULL)
--  Stock
--  Image
--  Orders
--  Orders-items
--  Invoice
--

