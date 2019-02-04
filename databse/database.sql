create database tutionmaster;
use tutionmaster;

create table Achievements(
	achievementID int primary key auto_increment,
	tutor varchar(30),
	name varchar(50),
	title varchar(100),
	description longtext,
	ImgUrl longtext,
	hideStatus boolean
);

create table BoostOffers(
	packageID int primary key auto_increment,
	package varchar(20),
	price float,
	discount float,
	startDate date,
	expiryDate date,
	duration int
);

create table District(
	DistrictID int primary key auto_increment,
	name varchar(30)
);

create table NewsFeed(
	newsID int primary key auto_increment,
	title text,
	content text,
	startDate date,
	expiryDate date
);

create table ProfileBoost(
	boostId int primary key auto_increment,
	email varchar(100),
	package varchar(20),
	startDate date,
	expiryDate date,
	boostPriority int
);

create table Rate(
		RateID int primary key auto_increment,
		tutor varchar(50),
		student varchar(50),
		rating float
);

create table Requests(
		reqID int primary key auto_increment,
		student varchar(50),
		tutor varchar(50),
		sent_date date,
		day varchar(30),
		location varchar(50),
		subject varchar(50),
		status varchar(50),
		show boolean default '1'
);

create table Review(
		ReviewID int primary key auto_increment,
		tutor varchar(50),
		student varchar(50),
		date date,
		content varchar(500)
);

create table Student(
		StudentID int primary key auto_increment,
		email varchar(50),
		confirmed tinyint,
		token varchar(20),
		pword varchar(100),
		name varchar(50),
		mobile varchar(10),
		location varchar(30),
		ImgUrl longtext,
		acc_status boolean default '1'
)

create table Subject(
		SubjectID int primary key auto_increment,
		Name varchar(50)
);

create table Suggestions(
		SuggestionID int primary key auto_increment,
		Sender varchar(50),
		Date date,
		Content varchar(500)
);

create table Tutor(
		TutorID int primary key auto_increment,
		email varchar(50),
		confirmed tinyint,
		token varchar(20),
		password varchar(100),
		startDate date,
		FirstName varchar(50),
		LastName varchar(50),
		description longtext,
		Location varchar(30),
		Mobile varchar(10),
		Subject varchar(30),
		Rate float,
		ImgUrl varchar(200),
		Price float,
		Available_time date,
		acc_status boolean default '1',
		priority int default '0'
);

create table ViewCount(
	tutor varchar(30) primary key,
	viewCount int default '0',
	dailyReachCount int default '0'
);
