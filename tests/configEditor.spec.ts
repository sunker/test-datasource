import * as semver from 'semver';
import { expect, test } from '@grafana/plugin-e2e';

test('Radio button group', async ({ readProvisionedDataSource, createDataSourceConfigPage, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await createDataSourceConfigPage({ type: ds.type });
  const radioButtonGroup = page.getByTestId('test-radio-button-group');
  await radioButtonGroup.getByText('val3').click({ force: true });
  await expect(radioButtonGroup.getByText('val3')).toBeChecked();
});

test('Inline field with switch', async ({
  readProvisionedDataSource,
  createDataSourceConfigPage,
  page,
  grafanaVersion,
}) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await createDataSourceConfigPage({ type: ds.type });
  // getByRole not working because the input element is outside of the viewport
  // passing label to Switch as it will be defined as aria-label
  const label = 'Inline field with switch';
  let switchLocator = page.getByLabel(label);
  if (semver.lt(grafanaVersion, '9.3.0')) {
    switchLocator = page.locator(`[label="${label}"]`).locator('../label');
  }
  await switchLocator.uncheck({ force: true });
  await expect(switchLocator).not.toBeChecked();
});

test('Inline field with checkbox', async ({ readProvisionedDataSource, createDataSourceConfigPage, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await createDataSourceConfigPage({ type: ds.type });
  await page.getByRole('checkbox', { name: 'Inline field with checkbox' }).uncheck({ force: true });
  await expect(page.getByRole('checkbox', { name: 'Inline field with checkbox' })).not.toBeChecked();
});

test('Inline field with input', async ({ readProvisionedDataSource, createDataSourceConfigPage, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await createDataSourceConfigPage({ type: ds.type });
  await page.getByRole('textbox', { name: 'Inline field with input' }).fill('test');
  await expect(page.getByRole('textbox', { name: 'Inline field with input' })).toHaveValue('test');
  // await page.getByLabel('Inline field with input').fill('test');
  // await expect(page.getByLabel('Inline field with input')).toHaveValue('test');
});

test('Select should have options', async ({
  readProvisionedDataSource,
  createDataSourceConfigPage,
  page,
  selectors,
}) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  const configPage = await createDataSourceConfigPage({ type: ds.type });
  await page.getByRole('combobox', { name: 'Inline field with select' }).click();
  await expect(configPage.getByTestIdOrAriaLabel(selectors.components.Select.option)).toHaveText([
    'val1',
    'val2',
    'val3',
  ]);
});

test('Selecting an option', async ({ readProvisionedDataSource, createDataSourceConfigPage, page, selectors }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  const configPage = await createDataSourceConfigPage({ type: ds.type });
  await page.getByRole('combobox', { name: 'Inline field with select' }).click();
  await configPage.getByTestIdOrAriaLabel(selectors.components.Select.option).getByText('val3').click();
  // await expect(configPage.getByTestIdOrAriaLabel('inline-field-with-select-wrapper')).toHaveText('val3');
});
