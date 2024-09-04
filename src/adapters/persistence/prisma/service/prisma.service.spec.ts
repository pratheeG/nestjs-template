import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
  });

  it('should connect to the database on module initialization', async () => {
    // Mock the $connect method
    const connectSpy = jest
      .spyOn(prismaService, '$connect')
      .mockResolvedValueOnce(undefined);

    // Call the onModuleInit method
    await prismaService.onModuleInit();

    // Verify that the $connect method was called
    expect(connectSpy).toHaveBeenCalled();

    // Restore the original implementation
    connectSpy.mockRestore();
  });
});
