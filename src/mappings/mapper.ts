import { createMap, createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { UserEntity } from '../models/entity/users.entity';
import { UserDTO } from '../models/dto/users.dto';
import { BookDTO, CreateBookModel, UpdateBookModel } from '../models/dto/books.dto';
import { BookEntity } from '../models/entity/books.entity';
// Create and export the mapper
const mapper = createMapper({
    strategyInitializer: classes(),
});

// Create the map
createMap(mapper, UserEntity, UserDTO);
createMap(mapper, UserDTO, UserEntity);
createMap(mapper, BookEntity, BookDTO);
createMap(mapper, CreateBookModel, BookEntity);
createMap(mapper, UpdateBookModel, BookEntity);

export default mapper;