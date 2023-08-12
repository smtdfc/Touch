CREATE TABLE users (
user_id TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
password TEXT NOT NULL,
role TEXT NOT NULL DEFAULT user,
status TEXT NOT NULL DEFAULT active,
group_id TEXT NOT NULL);

CREATE TABLE datatables (
dt_id TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
createBy TEXT NOT NULL,
status TEXT NOT NULL DEFAULT active);

CREATE TABLE dt_user (
dt_id TEXT NOT NULL,
user_id TEXT NOT NULL,
FOREIGN KEY(dt_id) REFERENCES datatables(dt_id),
FOREIGN KEY(user_id) REFERENCES users(user_id));

CREATE TABLE dashboards (
dashboard_id TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
status TEXT NOT NULL DEFAULT active);

CREATE TABLE dashboard_user (
dashboard_id TEXT NOT NULL,
user_id TEXT NOT NULL,
FOREIGN KEY(dashboard_id) REFERENCES dashboards(dashboard_id),
FOREIGN KEY(user_id) REFERENCES users(user_id));

CREATE TABLE devices (
device_id TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
token TEXT NOT NULL,
status TEXT NOT NULL DEFAULT active);

CREATE TABLE devices_user (
device_id TEXT NOT NULL,
user_id TEXT NOT NULL,
FOREIGN KEY(device_id) REFERENCES devices(device_id),
FOREIGN KEY(user_id) REFERENCES users(user_id));

CREATE TABLE dashboards_datatables (
dashboard_id TEXT NOT NULL,
dt_id TEXT NOT NULL,
FOREIGN KEY(dashboard_id) REFERENCES dashboards(dashboard_id),
FOREIGN KEY(dt_id) REFERENCES datatables(dt_id));

CREATE TABLE devices_datatables (
dt_id TEXT NOT NULL,
device_id TEXT NOT NULL,
FOREIGN KEY(dt_id) REFERENCES datatables(dt_id),
FOREIGN KEY(device_id) REFERENCES devices(device_id));

CREATE TABLE login_history (
token TEXT NOT NULL,
info TEXT NOT NULL,
id TEXT NOT NULL,
user_id TEXT NOT NULL,
FOREIGN KEY(user_id) REFERENCES users(user_id));

