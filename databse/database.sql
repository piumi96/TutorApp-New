create database tutorApp;
use tutorApp;

create table District(
		DistrictID int primary key auto_increment,
		name varchar(30)
);

create table Tutor(
		TutorID int primary key auto_increment,
		email varchar(50),
		password varchar(100),
		FirstName varchar(50),
		LastName varchar(50),
		Location varchar(30),
		Mobile varchar(10),
		Subject varchar(30),
		Rate float,
		ImgUrl varchar(200),
		Price float,
		Available_time date,
		acc_status boolean default '1'
);

create table Student(
		StudentID int primary key auto_increment,
		email varchar(50),
		pword varchar(100),
		name varchar(50),
		mobile varchar(10),
		location varchar(30),
		acc_status boolean default '1'
)

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
		status varchar(50)
);

create table Review(
		ReviewID int primary key auto_increment,
		tutor varchar(50),
		student varchar(50),
		date date,
		content varchar(500)
);

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