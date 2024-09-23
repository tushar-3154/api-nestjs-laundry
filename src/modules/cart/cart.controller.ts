import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/cart.dto';

@Controller('cart')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.CUSTOMER)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @Request() req,
    @Body() addCartDto: AddCartDto,
  ): Promise<Response> {
    const user = req.user;
    return this.cartService.addToCart(addCartDto, user.user_id);
  }

  @Get()
  async getAllCart(@Request() req): Promise<Response> {
    const user = req.user;
    return this.cartService.getAllCarts(user.user_id);
  }

  @Put(':cart_id')
  async updateCart(
    @Param('cart_id') cart_id: number,
    @Body('quantity') quantity: number,
  ): Promise<Response> {
    return this.cartService.updateCart(cart_id, quantity);
  }

  @Delete(':cart_id')
  async removeCart(
    @Param('cart_id', ParseIntPipe) cart_id: number,
  ): Promise<Response> {
    return this.cartService.removeCart(cart_id);
  }
}
