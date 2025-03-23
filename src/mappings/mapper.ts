import { createMap, createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { UserEntity } from '../models/entity/user.entity';
import { CreateUserModel, UserDTO } from '../models/dto/users.dto';
import { BookDTO, CreateBookModel, UpdateBookModel } from '../models/dto/books.dto';
import { BookEntity } from '../models/entity/book.entity';
import { CreateOrderModel } from '../models/dto/order.dto';
import { OrderEntity } from '../models/entity/order.entity';
import { OrderDao } from '../dao/order.dao';
// Create and export the mapper
const mapper = createMapper({
    strategyInitializer: classes(),
});

// Create the map
createMap(mapper, UserEntity, UserDTO);
createMap(mapper, CreateUserModel, UserEntity);
createMap(mapper, UserDTO, UserEntity);
createMap(mapper, BookEntity, BookDTO);
createMap(mapper, CreateBookModel, BookEntity);
createMap(mapper, UpdateBookModel, BookEntity);
createMap(mapper, CreateOrderModel, OrderEntity);
createMap(mapper, OrderEntity, OrderDao);

export default mapper;