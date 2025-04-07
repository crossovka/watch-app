import { rootActions } from '@/redux/root-actions';
import { useAppDispatch } from '@/redux/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

// связывает все экшены (rootActions) с dispatch,
// чтобы их можно было вызвать без передачи dispatch вручную
export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
