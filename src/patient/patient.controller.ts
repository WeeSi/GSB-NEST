import { Controller, Delete, Param, Post, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserDtoConverter } from '../user/converter/userDto.converter';
import { UserDto } from '../user/model/user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@ApiUseTags('patient')
@Controller('patient')
export class PatientController {
    constructor(
        private readonly userDtoConverter: UserDtoConverter,
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('auth'))
    @Post(':userId/doctor/:doctorId')
    @ApiImplicitParam({name: 'userId', description: 'User id to to update with doctor id passed into route param', required: true, type: Number})
    @ApiImplicitParam({name: 'doctorId', description: 'Doctor id to add to user id passed into route param', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User updated', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async addDoctor(
        @Request() req,
        @Param('userId', new ParseIntPipe()) userId: number, 
        @Param('doctorId', new ParseIntPipe()) doctorId: number,
    ): Promise<UserDto> {
        console.log(req.user);
        const userUpdated: User = await this.userService.addDoctorToPatient(req.user.id, userId, doctorId);
        return this.userDtoConverter.convertOutbound(userUpdated);
    }

    @UseGuards(AuthGuard('auth'))
    @Delete(':userId/doctor/:doctorId')
    @ApiImplicitParam({name: 'userId', description: 'User id to to update with doctor id passed into route param', required: true, type: Number})
    @ApiImplicitParam({name: 'doctorId', description: 'Doctor id to add to user id passed into route param', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User updated', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async removeDoctor(
        @Request() req,
        @Param('userId', new ParseIntPipe()) userId: number, 
        @Param('doctorId', new ParseIntPipe()) doctorId: number,
    ): Promise<UserDto> {
        const userUpdated: User = await this.userService.removeDoctorToPatient(req.user.id, userId, doctorId);
        return this.userDtoConverter.convertOutbound(userUpdated);
    }
}