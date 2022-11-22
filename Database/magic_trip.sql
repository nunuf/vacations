-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2022 at 08:57 PM
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
('3f1f0398-8c88-4ac7-af37-a52a0250e56d', '90efb97c-6e9e-4e51-a545-900862a73301'),
('3f1f0398-8c88-4ac7-af37-a52a0250e56d', '237b7122-7d58-4cf8-b28d-e9200800003d'),
('3f1f0398-8c88-4ac7-af37-a52a0250e56d', '4421f892-ea97-4806-8f60-8a231c8b2c60'),
('8a395710-a43a-49c6-aed4-58d5a5628aea', '90efb97c-6e9e-4e51-a545-900862a73301'),
('8228d5d9-3d03-4ce4-b1d3-20a64f301113', 'ba433060-9476-42fb-98dd-34213884b775'),
('8228d5d9-3d03-4ce4-b1d3-20a64f301113', 'd4d8968c-a209-4621-a398-6c25bae6aaed'),
('8228d5d9-3d03-4ce4-b1d3-20a64f301113', 'be7c677e-988f-4d0c-9395-bb30d5622fca');

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
('237b7122-7d58-4cf8-b28d-e9200800003d', 'Sirius', 'Black', 'sirius', '78efba726dabe9e82db9fa15621af4b28b47d8af450cf5a6f035f43fde4c56dbdf444c8a47db912c0492ff5a3c862a6713d1f0ec6ddd734b77f84a5dd37683c2', 'User'),
('362d8bb6-2d6c-4e1f-9c39-c75553bb3e05', 'Mr', 'Snape', 'admin', '46e7f1cb50e90ba908cbd384f70a8dd67c38e88eed5d14dfa1cfed1aab466669a3dd275ce946d6fee15963f1245d122fcdcb5883569854deee65a0bd1ce5a377', 'Admin'),
('4421f892-ea97-4806-8f60-8a231c8b2c60', 'Albus', 'Dumbledore', 'dumbledore', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
('90efb97c-6e9e-4e51-a545-900862a73301', 'Ron', 'Weasley', 'ron', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
('b88e6375-a253-4684-b3fd-7501951dcb4b', 'Harry', 'Potter', 'harry', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
('ba433060-9476-42fb-98dd-34213884b775', 'Lord', 'Voldemort', 'lord', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
('be7c677e-988f-4d0c-9395-bb30d5622fca', 'Rubeus', 'Hagrid', 'hagrid', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
('d4d8968c-a209-4621-a398-6c25bae6aaed', 'Hermione', 'Granger', 'hermione', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

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
('3f1f0398-8c88-4ac7-af37-a52a0250e56d', 'Seychelles', 'Amazing vacation to the best place in the world', '2022-12-13', '2022-12-20', '2099.00', 'd8955773-e7b9-4c8f-bfd1-f44b5d5cea6b.jpg'),
('8228d5d9-3d03-4ce4-b1d3-20a64f301113', 'Lapland', 'Enjoy all what Lapland nature has best to offer in summer with Magic Trip: wilderness, arctic animals, cultural trips, hiking and canoeing!', '2023-07-01', '2023-07-30', '10500.00', '528360cc-c4d1-4575-a870-9488001ae3e5.jpg'),
('8a395710-a43a-49c6-aed4-58d5a5628aea', 'Iceland', 'Venture to the Land of Fire and Ice with Magic Trip: explore glacier, lagoons, volcanos and black sand beaches', '2022-12-24', '2023-01-04', '7600.00', '8ed3c913-6356-4ec9-98c6-2cbbd66edc11.webp');

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
