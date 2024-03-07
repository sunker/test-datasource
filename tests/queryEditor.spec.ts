import * as semver from 'semver';
import { expect, test } from '@grafana/plugin-e2e';

test('Radio button group', async ({ panelEditPage, readProvisionedDataSource, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  const radioButtonGroup = page.getByTestId('test-radio-button-group');
  await radioButtonGroup.getByText('val3').click({ force: true });
  await expect(radioButtonGroup.getByText('val3')).toBeChecked();
});

test('Inline field with switch', async ({ panelEditPage, readProvisionedDataSource, page, grafanaVersion }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  // getByRole not working because the input element is outside of the viewport
  // passing label to Switch as it will be defined as aria-label
  let switchLocator = page.getByLabel('Inline field with switch');
  if (semver.lt(grafanaVersion, '9.3.0')) {
    switchLocator = switchLocator.locator('../label');
  }
  await switchLocator.uncheck({ force: true });
  await expect(switchLocator).not.toBeChecked();
});

test('Inline field with checkbox', async ({ panelEditPage, readProvisionedDataSource, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  await page.getByRole('checkbox', { name: 'Inline field with checkbox' }).uncheck({ force: true });
  await expect(page.getByLabel('Inline field with checkbox')).not.toBeChecked();
});

test('Inline field with input', async ({ panelEditPage, readProvisionedDataSource, page }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  await page.getByLabel('Inline field with input').fill('test');
  await expect(page.getByLabel('Inline field with input')).toHaveValue('test');
});

test('Select should have options', async ({ panelEditPage, readProvisionedDataSource, page, selectors }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  await page.getByLabel('Inline field with select').click();
  await expect(panelEditPage.getByTestIdOrAriaLabel(selectors.components.Select.option)).toHaveText([
    'val1',
    'val2',
    'val3',
  ]);
});

test('Selecting an option', async ({ panelEditPage, readProvisionedDataSource, page, selectors }) => {
  const ds = await readProvisionedDataSource({ fileName: 'datasources.yml' });
  await panelEditPage.datasource.set(ds.name);
  await page.getByLabel('Inline field with select').click();
  await panelEditPage.getByTestIdOrAriaLabel(selectors.components.Select.option).getByText('val3').click();
  // await expect(configPage.getByTestIdOrAriaLabel('inline-field-with-select-wrapper')).toHaveText('val3');
});
