import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getVendorById, updateVendorById } from 'apiSdk/vendors';
import { Error } from 'components/error';
import { vendorValidationSchema } from 'validationSchema/vendors';
import { VendorInterface } from 'interfaces/vendor';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function VendorEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<VendorInterface>(
    () => (id ? `/vendors/${id}` : null),
    () => getVendorById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: VendorInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateVendorById(id, values);
      mutate(updated);
      resetForm();
      router.push('/vendors');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<VendorInterface>({
    initialValues: data,
    validationSchema: vendorValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Vendor
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="service_offering" mb="4" isInvalid={!!formik.errors?.service_offering}>
              <FormLabel>Service Offering</FormLabel>
              <Input
                type="text"
                name="service_offering"
                value={formik.values?.service_offering}
                onChange={formik.handleChange}
              />
              {formik.errors.service_offering && <FormErrorMessage>{formik.errors?.service_offering}</FormErrorMessage>}
            </FormControl>
            <FormControl id="availability" mb="4" isInvalid={!!formik.errors?.availability}>
              <FormLabel>Availability</FormLabel>
              <Input
                type="text"
                name="availability"
                value={formik.values?.availability}
                onChange={formik.handleChange}
              />
              {formik.errors.availability && <FormErrorMessage>{formik.errors?.availability}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'vendor',
    operation: AccessOperationEnum.UPDATE,
  }),
)(VendorEditPage);
