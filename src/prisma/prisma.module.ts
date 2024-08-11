import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // now this module/service can be used in any other module
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
