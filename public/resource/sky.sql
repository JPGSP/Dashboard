CREATE DATABASE IF NOT EXISTS sky;

--
-- Database: `sky`
--

-- --------------------------------------------------------

--
-- Table structure for table `Test`
--

use sky;

CREATE TABLE `Test` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `cpu_load` float NOT NULL,
  `concurrency` int(11) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;