import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatLegacyInputHarness} from '@angular/material/legacy-input/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {InputHarnessExample} from './input-harness-example';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

describe('InputHarnessExample', () => {
  let fixture: ComponentFixture<InputHarnessExample>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatLegacyInputModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [InputHarnessExample],
    }).compileComponents();
    fixture = TestBed.createComponent(InputHarnessExample);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should load all input harnesses', async () => {
    const inputs = await loader.getAllHarnesses(MatLegacyInputHarness);
    expect(inputs.length).toBe(3);
  });

  it('should load input with a specific value', async () => {
    const inputs = await loader.getAllHarnesses(MatLegacyInputHarness.with({value: 'Sushi'}));
    expect(inputs.length).toBe(1);
  });

  it('should be able to set value of input', async () => {
    const inputs = await loader.getAllHarnesses(MatLegacyInputHarness);
    const input = inputs[0];
    expect(await input.getValue()).toBe('Sushi');

    await input.setValue('');

    expect(await input.getValue()).toBe('');
  });

  it('should be able to get disabled state', async () => {
    const inputs = await loader.getAllHarnesses(MatLegacyInputHarness);
    expect(inputs.length).toBe(3);

    expect(await inputs[0].isDisabled()).toBe(false);
    expect(await inputs[1].isDisabled()).toBe(false);
    expect(await inputs[2].isDisabled()).toBe(false);

    fixture.componentInstance.disabled = true;

    expect(await inputs[1].isDisabled()).toBe(true);
  });

  it('should be able to get type of input', async () => {
    const inputs = await loader.getAllHarnesses(MatLegacyInputHarness);
    expect(inputs.length).toBe(3);

    expect(await inputs[0].getType()).toBe('text');
    expect(await inputs[1].getType()).toBe('number');
    expect(await inputs[2].getType()).toBe('textarea');

    fixture.componentInstance.inputType = 'text';

    expect(await inputs[1].getType()).toBe('text');
  });
});
