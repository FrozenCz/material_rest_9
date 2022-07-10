import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {User} from 'src/users/models/user.entity';

export const IsManagerInTree = createParamDecorator((data: any) => {
    // const request = ctx.switchToHttp().getRequest();
    // console.log(request);
    console.log(data);
    return 'test';
})


// export function isManagerInTree(user: User, updatedThing)
