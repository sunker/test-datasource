import React, { ChangeEvent, useState } from 'react';
import { EditorRows, EditorRow } from '@grafana/experimental';
import { Checkbox, InlineField, InlineSwitch, Input, RadioButtonGroup, Select } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { MyDataSourceOptions, MyQuery } from '../types';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

const values = ['val1', 'val2', 'val3'].map((val) => ({ label: val, value: val }));

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
  const [booleanValue, setBooleanValue] = useState(true);
  const [stringValue, setStringValue] = useState('val2');

  return (
    <EditorRows>
      <EditorRow>
        <div data-testid="test-radio-button-group">
          <RadioButtonGroup options={values} value={stringValue} onChange={(v) => setStringValue(v)} />
        </div>
      </EditorRow>

      <EditorRow>
        <InlineField labelWidth={30} label="Inline field with switch">
          <InlineSwitch
            label="Inline field with switch"
            value={booleanValue}
            onChange={(event) => setBooleanValue(event.currentTarget.checked)}
          />
        </InlineField>
      </EditorRow>
      <EditorRow>
        <InlineField labelWidth={30} label="Inline field with checkbox">
          <Checkbox
            id="checkbox-inline-field"
            value={booleanValue}
            onChange={(event) => setBooleanValue(event.currentTarget.checked)}
          />
        </InlineField>
      </EditorRow>
      <EditorRow>
        <InlineField labelWidth={30} label="Inline field with input">
          <Input
            value={stringValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStringValue(e.target.value)}
            id="inline-field-with-input"
          />
        </InlineField>
      </EditorRow>
      <EditorRow>
        <InlineField labelWidth={30} label="Inline field with select">
          <Select
            data-testid="inline-field-with-select-wrapper"
            inputId="inline-field-with-select"
            value={stringValue}
            options={values}
            onChange={(values) => setStringValue(values.value!)}
          />
        </InlineField>
      </EditorRow>
    </EditorRows>
  );
}
