create table usersGroup(
	groupId bigint(20) unsigned auto_increment primary key,
	groupName char(50) not null unique,
	enabled bit not null
);
create table users_groups(
	id bigint(20) auto_increment primary key,
	groupId bigint(20) unsigned not null,
	userId bigint(20) unsigned not null,
	CONSTRAINT c_users_groups_1 FOREIGN KEY (groupId) REFERENCES usersGroup(groupId) ON DELETE CASCADE,
	CONSTRAINT c_users_groups_2 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);
create table users(
	userId bigint(20) unsigned auto_increment primary key,
	userName char(50) not null,
	password char(20) not null,
	enabled bit not null
);
create table hosts(
	hostId varchar(255) not null primary key,
	hostName varchar(255) not null unique,
	ip varchar(255) not null unique,
	envType varchar(255) not null,
	hostGroup varchar(255) not null,
	place varchar(255) not null,
	rootPassword varchar(255) not null,
	allocated bit not null,
	createdAt timestamp not null default now(),
	osVersion varchar(255) not null,
	configuration varchar(255) not null,
	hostType varchar(255) not null,
	esxiIp varchar(255) not null
);

create table kafka_cluster(
	clusterId varchar(255) primary key,
	clusterName varchar(255) not null unique,
	clusterEnv varchar(255) not null,
	createdAt datetime default now()
);

create table host_cluster(
	hcId varchar(255) primary key,
	hostId varchar(255) not null,
	clusterId varchar(255) not null,
	CONSTRAINT c_host_cluster_1 FOREIGN KEY (hostId) REFERENCES hosts(hostId),
	CONSTRAINT c_host_cluster_2 FOREIGN KEY (clusterId) REFERENCES kafka_cluster(clusterId)
); 
