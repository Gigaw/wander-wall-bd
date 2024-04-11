create TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

insert into roles (name) values ('Admin');
insert into roles (name) values ('User');

create TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    img_url VARCHAR(100) ,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

create TABLE levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    points INT NOT NULL
);

insert into levels (name, points) values ('Beginner', 1);
insert into levels (name, points) values ('Intermediate', 2);
insert into levels (name, points) values ('Advanced', 3);

create TABLE tours (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    img_url VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    distance INT NOT NULL,
    map_data JSON NOT NULL,
    level_id INT NOT NULL,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

create TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

create TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    rating INT NOT NULL,
    img_url VARCHAR(100),
    comment TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

create TABLE review_images (
    id SERIAL PRIMARY KEY,
    img_url VARCHAR(100) NOT NULL,
    review_id INT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);


create TABLE hikes (
    id SERIAL PRIMARY KEY,
    tour_id INT NOT NULL,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    date_created TIMESTAMP NOT NULL,
    capacity INT NOT NULL,
    max_capacity INT NOT NULL,
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

create TABLE statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

insert into statuses (name, description) values ('Pending', 'The booking is pending');
insert into statuses (name, description) values ('Approved', 'The booking is approved');
insert into statuses (name, description) values ('Rejected', 'The booking is rejected');

create TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    hike_id INT NOT NULL,
    status_id INT NOT NULL,
    date_created TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id),
    FOREIGN KEY (status_id) REFERENCES statuses(id)
);