-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2023 at 06:04 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend_intern_assign`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `userid` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `price` int(255) NOT NULL,
  `totalamount` int(255) NOT NULL,
  `orderDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userid`, `username`, `productname`, `quantity`, `price`, `totalamount`, `orderDate`) VALUES
(2, 2, 'coomar', 'product', 5, 400, 2000, '0000-00-00'),
(3, 2, 'coomar', 'product 2', 5, 400, 2000, '0000-00-00'),
(6, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(7, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(8, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(9, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(10, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(11, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-12'),
(12, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-19'),
(13, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(14, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-09-13'),
(15, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(16, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(17, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(18, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-05'),
(19, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-06'),
(20, 2, 'coomar', 'product 5', 5, 400, 2000, '2023-07-06'),
(21, 4, 'coomar', 'product 5', 5, 400, 2000, '2023-07-06');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(255) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `productname`, `description`, `category`, `price`, `quantity`, `brand`, `image`) VALUES
(1, 'updated', 'updated', 'updated', 2000, 9, 'updated', 'updated'),
(4, 'updated', 'updated', 'updated', 2000, 9, 'updated', 'updated'),
(5, 'Product 3', 'Description', 'Cat A', 2000, 9, 'Apple', 'Pro Max'),
(6, 'updated 5', 'updated 5 timws', 'updated', 2000, 9, 'updated', 'updated'),
(7, 'Product 9', 'Description', 'Cat A', 2000, 9, 'Apple', 'Pro Max');

-- --------------------------------------------------------

--
-- Table structure for table `sales_report`
--

CREATE TABLE `sales_report` (
  `id` int(255) NOT NULL,
  `report_interval` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `totalSales` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_report`
--

INSERT INTO `sales_report` (`id`, `report_interval`, `date`, `totalSales`) VALUES
(1, 'day', '2023-07-05', 2000),
(2, 'day', '2023-07-05', 2000),
(3, 'week', '2023-07-05', 2000),
(4, 'report_interval', '2023-07-05', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `email`, `password`) VALUES
(2, 'coomar', 'kumarbhetwal25@gmail.com', '11111111'),
(4, 'coomar', 'kumarbhetwal25@gmail.com', '11111111'),
(6, 'shyam', 'kumarbhetwal25@gmail.com', '11111111'),
(7, 'Updated5', 'updated45@gmail.com', '723339875376q5'),
(8, 'string', 'user@example.com', 'string'),
(9, 'kumarchaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(10, 'kumarchaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(11, 'Kumar_Chaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(12, 'Kumar_Chaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(13, 'ram', 'kumarbhetwal25@gmail.com', '11111111'),
(15, 'Kumar_Chaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(16, 'Kumar_Chaudhary', 'kumarbhetwal25@gmail.com', '11111111'),
(17, 'ram', 'kumarbhetwal25@gmail.com', '$2b$10$ihKQmkg9i5vhKgeTDaOipeNs4bSUEAG6OPgoWgc16NzG3IeKd9zZq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_report`
--
ALTER TABLE `sales_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sales_report`
--
ALTER TABLE `sales_report`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
