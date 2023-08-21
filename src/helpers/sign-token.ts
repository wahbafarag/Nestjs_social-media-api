import { JwtService } from '@nestjs/jwt';

export async function signToken(
  payload: any,
  jwtService: JwtService,
): Promise<string> {
  const { id } = payload;
  return jwtService.sign({ id });
}
