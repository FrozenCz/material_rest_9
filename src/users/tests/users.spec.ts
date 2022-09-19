// import {UsersController} from '../users.controller';
// import {UsersService} from '../users.service';
// import {Test} from '@nestjs/testing';
// import {of} from 'rxjs';
// import {UserRepository} from '../repositories/user.repository';
// import {UnitsService} from '../../units/units.service';
// import {RightsService} from '../rights.service';
// import {WsGateway} from '../../ws.gateway';
// import {AssetsService} from '../../assets/assets.service';
// import {PassportModule} from '@nestjs/passport';
// import {User} from '../models/user.entity';
//
//
//
// const mockRepository = () => ({
// });
//
// describe('UsersController',  () => {
//     let usersController: UsersController;
//     let userService: UsersService;
//
//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             imports: [PassportModule.register({defaultStrategy: 'jwt'})],
//             controllers: [UsersController],
//             providers: [
//                 UsersService,
//                 {provide: UserRepository, useFactory: mockRepository},
//                 {provide: UnitsService, useFactory: mockRepository},
//                 {provide: RightsService, useFactory: mockRepository},
//                 {provide: WsGateway, useFactory: mockRepository},
//                 {provide: AssetsService, useFactory: mockRepository},
//             ],
//         }).compile();
//
//         userService = await moduleRef.resolve(UsersService);
//         usersController = await moduleRef.resolve(UsersController);
//     });
//
//     describe('getUsers', () => {
//         it('should return an array of users', async () => {
//             const user: User = new User();
//             user.name = 'testUserName';
//             user.surname = 'testUserSurname';
//             user.username = 'testUserUsername';
//             const result = [user];
//             jest.spyOn(userService, 'getUsers').mockImplementation(() => of(result).toPromise());
//             expect(await usersController.getUsers(null, null)).toBe(result)
//         });
//     });
//
//
// });
