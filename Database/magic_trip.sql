-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2022 at 04:46 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magic_trip`
--
CREATE DATABASE IF NOT EXISTS `magic_trip` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `magic_trip`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` varchar(40) NOT NULL,
  `userId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
('8b4d048f-7c5a-4f57-aa44-fa77f7186eda', 'ba433060-9476-42fb-98dd-34213884b775'),
('20fd9448-7ec1-45b3-91ba-7a5b5f18766c', 'ba433060-9476-42fb-98dd-34213884b775'),
('974f3b55-f82a-4940-a5d3-77461bf0bcab', 'ba433060-9476-42fb-98dd-34213884b775'),
('dc143a96-6e2f-4dd7-a996-f61097991ca4', 'ba433060-9476-42fb-98dd-34213884b775'),
('1a72e254-67e1-4e81-b9f8-53853ebf0cea', 'ba433060-9476-42fb-98dd-34213884b775'),
('20fd9448-7ec1-45b3-91ba-7a5b5f18766c', 'd4d8968c-a209-4621-a398-6c25bae6aaed'),
('8b4d048f-7c5a-4f57-aa44-fa77f7186eda', 'd4d8968c-a209-4621-a398-6c25bae6aaed'),
('0719864f-7817-4078-b047-0903841cfd3d', 'd4d8968c-a209-4621-a398-6c25bae6aaed'),
('7bc2bbd0-c643-43f1-ae1f-bc5520abfe97', 'd4d8968c-a209-4621-a398-6c25bae6aaed'),
('20fd9448-7ec1-45b3-91ba-7a5b5f18766c', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('802eedf0-9d6d-4d76-bac2-aaed200a0290', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('dc143a96-6e2f-4dd7-a996-f61097991ca4', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('b7da987e-57bb-4934-abac-36717cd7fb8e', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('9b5630eb-d665-4461-8469-4d89043b5dc1', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('8d6d82a7-159a-4e21-a157-793449eabe42', 'e5ffb787-9ae8-474b-be46-6f84e5234564'),
('8d6d82a7-159a-4e21-a157-793449eabe42', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('938f382d-0a7e-47a4-8abe-92c20027bff5', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('ddec74ce-8010-4c91-9a7c-83163c4f9c16', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('fbfa2868-a911-4758-a177-532bbe366eec', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('9b5630eb-d665-4461-8469-4d89043b5dc1', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('dc143a96-6e2f-4dd7-a996-f61097991ca4', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('20fd9448-7ec1-45b3-91ba-7a5b5f18766c', '90efb97c-6e9e-4e51-a545-900862a73301'),
('9b5630eb-d665-4461-8469-4d89043b5dc1', '90efb97c-6e9e-4e51-a545-900862a73301'),
('938f382d-0a7e-47a4-8abe-92c20027bff5', '90efb97c-6e9e-4e51-a545-900862a73301'),
('8d6d82a7-159a-4e21-a157-793449eabe42', '90efb97c-6e9e-4e51-a545-900862a73301'),
('afb7577a-0f9f-43b2-9198-34da281a0f18', '90efb97c-6e9e-4e51-a545-900862a73301'),
('dc143a96-6e2f-4dd7-a996-f61097991ca4', '90efb97c-6e9e-4e51-a545-900862a73301'),
('8b4d048f-7c5a-4f57-aa44-fa77f7186eda', '90efb97c-6e9e-4e51-a545-900862a73301'),
('974f3b55-f82a-4940-a5d3-77461bf0bcab', '90efb97c-6e9e-4e51-a545-900862a73301'),
('0719864f-7817-4078-b047-0903841cfd3d', '90efb97c-6e9e-4e51-a545-900862a73301'),
('fbfa2868-a911-4758-a177-532bbe366eec', '90efb97c-6e9e-4e51-a545-900862a73301'),
('1a72e254-67e1-4e81-b9f8-53853ebf0cea', '90efb97c-6e9e-4e51-a545-900862a73301'),
('c121617f-698e-440e-947d-e87c5fc3a898', '90efb97c-6e9e-4e51-a545-900862a73301'),
('36be965a-7458-4c2e-b35c-37b3e6c218b1', '90efb97c-6e9e-4e51-a545-900862a73301');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` varchar(40) NOT NULL,
  `roleValue` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleValue`) VALUES
('Admin', 'Admin'),
('User', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(40) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(150) NOT NULL,
  `roleId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
('4421f892-ea97-4806-8f60-8a231c8b2c60', 'Albus', 'Dumbledore', 'dumbledore', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('8f1d3f63-717d-4a7a-b277-2b8f4d2cf240', 'Mr', 'Snape', 'admin', 'dcab1319744f344179159b7ccf087bd0acf4ef1fea3777c85f726516472254f6366e0875539cabc3cdedc0bfd96c262f24b6592e3ed333523626c3dbcb8bc09a', 'Admin'),
('90efb97c-6e9e-4e51-a545-900862a73301', 'Ron', 'Weasley', 'ron', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('b88e6375-a253-4684-b3fd-7501951dcb4b', 'Harry', 'Potter', 'harry', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('ba433060-9476-42fb-98dd-34213884b775', 'Lord', 'Voldemort', 'lord', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('be7c677e-988f-4d0c-9395-bb30d5622fca', 'Rubeus', 'Hagrid', 'hagrid', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('d4d8968c-a209-4621-a398-6c25bae6aaed', 'Hermione', 'Granger', 'hermione', '50c36632f9a16061cc32eb6ec2c97ac94cad2ccd3383975e360efdb13abe7890602baeffea7801cf13dfa576ee29237b0a3ee815b12fd64841a3aa17c08f6fea', 'User'),
('e5ffb787-9ae8-474b-be46-6f84e5234564', 'Sirius', 'Black', 'sirius', '2c468ff50f65a770819850e857021b7ec44e1fe63b723b0784ace4806d2c045246ffe2f050b13580b4149ae0c396ff65199ed5c1a52853456eb67bd67c266fbe', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` varchar(40) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
('0719864f-7817-4078-b047-0903841cfd3d', 'Italy ', 'Italy is a country famous not only for its glorious landscapes, rich history and vibrant culture, but also for the Italian divine food that is a perfect fit for everyone', '2023-08-18', '2023-08-31', '8888.00', '69f4aae1-e409-4e85-8a16-53ac9db4ecef.jpg'),
('1458d4d0-c56b-4569-9abf-d4ab0498a8b1', 'Egypt', 'Year-round sunny beaches. The archaeological beauty and grandeur of the remaining temples, monuments, tombs, and artifacts of the Ancient Egyptian civilization', '2023-01-30', '2023-02-14', '3000.00', '8871950e-4857-49e1-aa22-a0ca2955f18c.jpg'),
('1a72e254-67e1-4e81-b9f8-53853ebf0cea', 'Cuba', 'Brimming with charm, personality and dancing colours, Cuba is a one-of-a-kind destination. From its rustic colonial era buildings to its world-beating rum and revolutionary history', '2023-10-18', '2023-10-25', '5000.00', '11b010d4-02ec-4e45-9634-36f2fadb5bf9.jpg'),
('20fd9448-7ec1-45b3-91ba-7a5b5f18766c', 'New York', 'Empire State Building, Ellis Island, the Statue of Liberty on Liberty Island, Broadway theatre productions, Central Park, Times Square, Coney Island, the Financial District, museums, and sports stadiums', '2024-01-01', '2024-01-08', '13000.00', 'b0a62a14-1981-4e66-9549-234e46196713.jpg'),
('36be965a-7458-4c2e-b35c-37b3e6c218b1', 'Hawaii', 'World-class beaches, pristine rainforests, and sizzling volcanoes are just a few things that make Hawaii a happening hotspot for tourists, so come take adventure with magic trip', '2023-10-13', '2023-10-22', '7770.00', 'e7275d3f-9e9e-4192-8d39-afece7314d7e.jpg'),
('7bc2bbd0-c643-43f1-ae1f-bc5520abfe97', 'Spain', 'Come see the famous Spanish festivals, enviable blue flag beaches, the vibrant nightlife and it’s delightful gastronomy', '2023-08-08', '2023-08-16', '9000.00', '9787b4d8-5003-4bfe-9427-3a4f61f131e7.jpg'),
('802eedf0-9d6d-4d76-bac2-aaed200a0290', 'Austria', 'Come enjoy thrilling ski trips and charming Christmas markets', '2023-12-25', '2024-01-01', '13000.00', '386538b1-9256-457d-b2e7-6aa5679ab572.jpg'),
('8b4d048f-7c5a-4f57-aa44-fa77f7186eda', 'Israel', 'The sights, ranging from Biblical ruins to Crusader fortresses to WWII memorials to cosmopolitan cities, are breathtaking', '2023-09-09', '2023-09-29', '9990.00', '47d9df91-4442-4142-a142-ebd3b27a470e.jpg'),
('8d6d82a7-159a-4e21-a157-793449eabe42', 'Hungary ', 'Romantic architecture, picture-postcard scenery and an abundance of thermal baths are just a few of the things that make Hungary a must-visit destination', '2023-03-30', '2023-04-14', '7900.00', '0499c517-1628-4619-bca4-68179ea29ce2.jpg'),
('938f382d-0a7e-47a4-8abe-92c20027bff5', 'Iceland', 'Venture to the Land of Fire and Ice with Magic Trip: explore glacier, lagoons, volcanos and black sand beaches', '2023-04-04', '2023-04-24', '20000.00', 'a83f3b4f-7533-40f3-ac40-17fedf416b88.jpg'),
('974f3b55-f82a-4940-a5d3-77461bf0bcab', 'Mexico', 'Fabulous beaches, ancient ruins, alluring culture, dynamic cities brimming with colonial architecture, and feisty mouthwatering cuisine, Mexico truly is a tropical treasure trove', '2024-02-07', '2024-02-15', '8000.00', 'd3e0ee79-bee1-4783-b878-948f164c3cac.jpg'),
('9b5630eb-d665-4461-8469-4d89043b5dc1', 'Ireland', 'A place to visit not only for its beauty and history, but because of its lively atmosphere. The Irish are known worldwide for their festive celebration and the country hosts many events and festivals along the year. Magic trips take you to the TradFest held in Dublin', '2023-01-18', '2023-01-31', '14600.00', 'ae6c5657-47bd-467c-afdf-c4d0f515a18d.jpg'),
('afb7577a-0f9f-43b2-9198-34da281a0f18', 'Canada', 'Visit British Columbia For Oceanfront Resorts, Wildlife, Hiking Trips And More. Amazing Sandy Beaches, Postcard Views, World-Class Biking And Hiking Trails', '2023-08-01', '2023-08-08', '5500.00', 'fb6cda36-80a0-4b67-9e09-f9cadda1a6c6.jpg'),
('b23359c0-48a1-44c4-8ebf-2daf38eefde2', 'Germany', 'Castles, beer gardens, rich history, modern cities, and old world charm', '2023-06-10', '2023-06-24', '7000.00', '651e9b4c-5cad-479c-98ce-e819a67209ad.jpg'),
('b7da987e-57bb-4934-abac-36717cd7fb8e', 'New Zealand', 'One of the most sought-after destinations in the world. With its snow-capped mountains, ancient glaciers, rolling hills, and copious amounts of wine, it’s a destination unlike all others', '2023-05-09', '2023-05-24', '12000.00', 'f3922481-f841-42b1-9a6a-6dbe1ddcc64d.jpg'),
('c121617f-698e-440e-947d-e87c5fc3a898', 'Denmark', 'Museums, design, castles, Viking attractions, festivals and award-winning Michelin restaurants', '2023-11-22', '2023-11-30', '7800.00', 'c28a94a9-74e3-4bcf-9400-95e96f5f1faa.jpg'),
('dc143a96-6e2f-4dd7-a996-f61097991ca4', 'Romania', 'Snow-capped mountains, green hills covered in forests and vineyards, sandy Black Sea beaches europe\'s largest and best preserved delta, and famous story of dracula\'s castel', '2023-10-08', '2023-10-28', '10888.00', '4f7bf3d2-81cc-4e56-8a49-ef068f0c7700.jpeg'),
('ddec74ce-8010-4c91-9a7c-83163c4f9c16', 'Lapland', 'Enjoy all what Lapland nature has best to offer in summer with Magic Trip: wilderness, arctic animals, cultural trips, hiking and canoeing', '2023-07-01', '2023-07-24', '18889.00', '38be80cb-00f7-4c0b-9136-312e2c3175f6.jpg'),
('fbfa2868-a911-4758-a177-532bbe366eec', 'Seychelles', 'Amazing vacation to paradise on earth', '2023-02-08', '2023-02-28', '15259.00', 'd5fb93a2-c55f-4212-9f84-457ef25f4590.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
