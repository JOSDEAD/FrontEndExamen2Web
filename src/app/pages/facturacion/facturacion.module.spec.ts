import { FacturacionModule } from './facturacion.module';

describe('FacturacionModule', () => {
  let facturacionModule: FacturacionModule;

  beforeEach(() => {
    facturacionModule = new FacturacionModule();
  });

  it('should create an instance', () => {
    expect(facturacionModule).toBeTruthy();
  });
});
