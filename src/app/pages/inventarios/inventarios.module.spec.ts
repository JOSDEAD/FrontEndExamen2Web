import { InventariosModule } from './inventarios.module';

describe('InventariosModule', () => {
  let inventariosModule: InventariosModule;

  beforeEach(() => {
    inventariosModule = new InventariosModule();
  });

  it('should create an instance', () => {
    expect(inventariosModule).toBeTruthy();
  });
});
