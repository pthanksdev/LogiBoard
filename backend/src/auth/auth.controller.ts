import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CloudinaryService } from '../common/cloudinary.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = (await this.authService.validateUser(
      body.email,
      body.password,
    )) as { email: string; id: string; companyId: string | null; role: string };
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('oauth-login')
  async oauthLogin(
    @Body()
    body: {
      email: string;
      firstName: string;
      lastName: string;
      provider: string;
      providerId: string;
    },
  ) {
    return this.authService.validateOAuthUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @Request()
    req: {
      user: {
        userId: string;
        email: string;
        companyId: string | null;
        role: string;
      };
    },
  ) {
    return this.authService.getUserProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.cloudinaryService.uploadImage(file);
    if ('secure_url' in result) {
      return this.authService.updateAvatar(req.user.userId, result.secure_url);
    }
    throw new Error('Upload failed');
  }
}
